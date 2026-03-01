import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Room prices - single source of truth on server
const ROOM_PRICES: Record<string, number> = {
  "Deluxe Room": 5500,
  "Premium Deluxe Room": 7500,
  "Executive Suite": 12000,
  "Family Suite": 15000,
  "Presidential Suite": 25000,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // User client for auth verification
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const userId = user.id;

    // Parse and validate input
    const { room_type, check_in, check_out, guests } = await req.json();

    if (!room_type || !check_in || !check_out) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const roomPrice = ROOM_PRICES[room_type];
    if (!roomPrice) {
      return new Response(JSON.stringify({ error: 'Invalid room type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const guestsNum = Math.min(Math.max(parseInt(guests) || 2, 1), 4);
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkOutDate <= checkInDate) {
      return new Response(JSON.stringify({ error: 'Invalid dates' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Admin client for trusted operations
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Fetch profile server-side to determine discount eligibility
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('total_bookings, offer_eligible')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Server-side pricing calculation
    const isEligible = profile.offer_eligible === true;
    const discountRate = isEligible ? 0.20 : 0;
    const baseAmount = roomPrice * nights;
    const discountAmount = baseAmount * discountRate;
    const afterDiscount = baseAmount - discountAmount;
    const gst = afterDiscount * 0.18;
    const totalAmount = afterDiscount + gst;

    // Insert booking with server-calculated values
    const { error: bookingError } = await supabaseAdmin.from('bookings').insert({
      user_id: userId,
      room_type,
      amount: totalAmount,
      gst_amount: gst,
      discount_applied: isEligible,
      check_in,
      check_out,
      guests: guestsNum,
      status: 'confirmed',
    });

    if (bookingError) {
      console.error('Booking insert error:', bookingError);
      return new Response(JSON.stringify({ error: 'Failed to create booking' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Update profile
    const newTotalBookings = profile.total_bookings + 1;
    const newOfferEligible = newTotalBookings >= 1;

    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ total_bookings: newTotalBookings, offer_eligible: newOfferEligible })
      .eq('id', userId);

    if (updateError) {
      console.error('Profile update error:', updateError);
    }

    return new Response(JSON.stringify({
      success: true,
      booking: {
        room_type,
        check_in,
        check_out,
        guests: guestsNum,
        nights,
        base_amount: baseAmount,
        discount_applied: isEligible,
        discount_amount: discountAmount,
        gst_amount: gst,
        total_amount: totalAmount,
      }
    }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create booking error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
