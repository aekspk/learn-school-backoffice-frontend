import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLogin } from "./hooks/api";
import { loginSchema, type LoginFormValues } from "./schema";
import { LoginBgPattern } from "./components/login-bg-pattern";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        toast.success("Signed in successfully");
        navigate("/");
      },
      onError: () => {
        toast.error("Invalid email or password");
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <LoginBgPattern />

      {/* ── Main content ── */}
      <div className="w-full max-w-sm space-y-6 relative">
        <div className="flex flex-col items-center gap-3 animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <GraduationCap className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Learn School
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Administrative Access Portal
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm px-8 py-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Sign In
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="lsb+staff@gmail.com"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-9 pr-9"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember this device
                </label>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-xs text-muted-foreground animate-fade-up" style={{ animationDelay: "160ms" }}>
          Having trouble?{" "}
          <a
            href="mailto:admin@learnschool.com"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Contact System Admin
          </a>
        </p>
      </div>
    </div>
  );
}
