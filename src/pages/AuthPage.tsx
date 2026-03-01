import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/hero-resort.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back to Dora Paradise!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Account created! Please check your email to verify your account.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Crown className="w-16 h-16 text-hotel-gold mx-auto mb-6" />
            <h1 className="font-heading text-5xl font-bold text-hotel-cream mb-4">
              Dora Paradise
            </h1>
            <p className="text-hotel-gold-light text-sm tracking-[0.3em] uppercase font-body mb-8">
              Resort & Spa
            </p>
            <p className="text-hotel-cream/80 font-body text-lg leading-relaxed max-w-md">
              Experience the essence of Tamil Nadu luxury in the heart of Coimbatore.
              Where tradition meets modern elegance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-hotel-dark p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Crown className="w-12 h-12 text-hotel-gold mx-auto mb-3" />
            <h1 className="font-heading text-3xl font-bold text-hotel-cream">Dora Paradise</h1>
            <p className="text-hotel-gold-light text-xs tracking-[0.3em] uppercase font-body mt-1">
              Resort & Spa
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-hotel-cream">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-hotel-cream/50 font-body text-sm mt-2">
              {isLogin
                ? "Sign in to access your luxury experience"
                : "Join us for an unforgettable stay"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="font-body text-sm text-hotel-cream/80">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-cream/40" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="pl-10 bg-hotel-dark-lighter border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold h-12"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-body text-sm text-hotel-cream/80">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-cream/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="pl-10 bg-hotel-dark-lighter border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-body text-sm text-hotel-cream/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-cream/40" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pl-10 pr-10 bg-hotel-dark-lighter border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-hotel-cream/40 hover:text-hotel-cream/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              variant="gold"
              size="xl"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          <div className="divider-gold my-8" />

          <p className="text-center text-hotel-cream/50 font-body text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-hotel-gold hover:text-hotel-gold-light transition-colors font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
