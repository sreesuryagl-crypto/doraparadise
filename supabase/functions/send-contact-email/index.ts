import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple validation helpers
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // Validate inputs
    const errors: string[] = [];
    if (!name || name.length > 100) errors.push("Name is required and must be under 100 characters");
    if (!email || !isValidEmail(email) || email.length > 255) errors.push("A valid email is required");
    if (!message || message.length < 10 || message.length > 2000) errors.push("Message must be between 10 and 2000 characters");

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize for logging (strip control characters)
    const safeName = name.replace(/[\x00-\x1F\x7F]/g, '');
    const safeEmail = email.replace(/[\x00-\x1F\x7F]/g, '');
    console.log(`Contact form submission from ${safeName} (${safeEmail})`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been received. Our team will get back to you within 24 hours." 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your message" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
