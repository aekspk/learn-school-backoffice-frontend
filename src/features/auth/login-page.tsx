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
import { useLogin } from "./hooks/api";
import { loginSchema, type LoginFormValues } from "./schema";

const ic: React.SVGAttributes<SVGElement> = {
  fill: "none",
  stroke: "#8b5cf6",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeOpacity: 0.11,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/");
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* ── Background pattern ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#dde2f5]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            {/* Graph-paper grid */}
            <pattern
              id="grid"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 22 0 L 0 0 0 22"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="0.45"
                strokeOpacity="0.08"
              />
            </pattern>

            {/* 400×400 doodle tile */}
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="400"
              height="400"
              patternUnits="userSpaceOnUse"
            >
              <rect width="400" height="400" fill="url(#grid)" />

              {/* ── Open Book ── */}
              <g transform="translate(32,38)" {...ic}>
                <path d="M0 26 L0 2 Q0 0 2 0 L14 1.5 L14 28 L2 26 Q0 26 0 24Z" />
                <path d="M28 26 L28 2 Q28 0 26 0 L14 1.5 L14 28 L26 26 Q28 26 28 24Z" />
                <line x1="3" y1="8" x2="12" y2="8" />
                <line x1="3" y1="13" x2="12" y2="13" />
                <line x1="16" y1="8" x2="25" y2="8" />
                <line x1="16" y1="13" x2="25" y2="13" />
              </g>

              {/* ── Pencil (diagonal) ── */}
              <g transform="translate(128,58) rotate(-45)" {...ic}>
                <rect x="-5" y="-22" width="10" height="28" rx="2" />
                <path d="M-5 6 L0 16 L5 6Z" />
                <line x1="-5" y1="-12" x2="5" y2="-12" />
              </g>

              {/* ── 4-point sparkle ── */}
              <g transform="translate(198,42)" {...ic}>
                <path d="M0-13 C-1-3-3-1-13 0 C-3 1-1 3 0 13 C1 3 3 1 13 0 C3-1 1-3 0-13Z" />
              </g>

              {/* ── Ruler ── */}
              <g transform="translate(240,36) rotate(18)" {...ic}>
                <rect x="0" y="0" width="44" height="14" rx="2" />
                <line x1="8" y1="0" x2="8" y2="8" />
                <line x1="16" y1="0" x2="16" y2="5" />
                <line x1="24" y1="0" x2="24" y2="8" />
                <line x1="32" y1="0" x2="32" y2="5" />
                <line x1="40" y1="0" x2="40" y2="8" />
              </g>

              {/* ── Atom ── */}
              <g transform="translate(350,52)" {...ic}>
                <circle cx="0" cy="0" r="4.5" />
                <ellipse cx="0" cy="0" rx="18" ry="7" />
                <ellipse cx="0" cy="0" rx="18" ry="7" transform="rotate(60)" />
                <ellipse cx="0" cy="0" rx="18" ry="7" transform="rotate(120)" />
              </g>

              {/* ── Globe ── */}
              <g transform="translate(56,148)" {...ic}>
                <circle cx="0" cy="0" r="16" />
                <ellipse cx="0" cy="0" rx="8" ry="16" />
                <line x1="-16" y1="0" x2="16" y2="0" />
                <line x1="-14" y1="-8" x2="14" y2="-8" />
                <line x1="-14" y1="8" x2="14" y2="8" />
              </g>

              {/* ── Double musical note ── */}
              <g transform="translate(128,128)" {...ic}>
                <ellipse
                  cx="0"
                  cy="16"
                  rx="5"
                  ry="3.5"
                  transform="rotate(-15)"
                />
                <ellipse
                  cx="14"
                  cy="12"
                  rx="5"
                  ry="3.5"
                  transform="rotate(-15)"
                />
                <line x1="5" y1="14" x2="5" y2="-6" />
                <line x1="19" y1="10" x2="19" y2="-10" />
                <line x1="5" y1="-6" x2="19" y2="-10" />
              </g>

              {/* ── Apple ── */}
              <g transform="translate(198,140)" {...ic}>
                <path d="M0-5 C-12-5-16 6-14 16 C-12 24-6 28 0 28 C6 28 12 24 14 16 C16 6 12-5 0-5Z" />
                <path d="M0-5 Q2-12 8-10" />
                <line x1="-6" y1="10" x2="6" y2="10" />
              </g>

              {/* ── Flask ── */}
              <g transform="translate(288,138)" {...ic}>
                <path d="M-5-18 L-5-2 L-16 16 Q-18 22-12 24 L12 24 Q18 22 16 16 L5-2 L5-18Z" />
                <line x1="-5" y1="-18" x2="5" y2="-18" />
                <circle cx="-6" cy="16" r="2" />
                <circle cx="4" cy="20" r="1.5" />
              </g>

              {/* ── Scissors ── */}
              <g transform="translate(362,138)" {...ic}>
                <circle cx="-9" cy="11" r="6" />
                <circle cx="9" cy="11" r="6" />
                <line x1="-4" y1="8" x2="14" y2="-14" />
                <line x1="4" y1="8" x2="-14" y2="-14" />
              </g>

              {/* ── DNA double helix ── */}
              <g transform="translate(42,248)" {...ic}>
                <path d="M-8-22 C8-14 8-6-8 2 C-24 10-24 18-8 26" />
                <path d="M8-22 C-8-14-8-6 8 2 C24 10 24 18 8 26" />
                <line x1="-4" y1="-18" x2="4" y2="-18" />
                <line x1="-8" y1="-8" x2="8" y2="-8" />
                <line x1="-8" y1="2" x2="8" y2="2" />
                <line x1="-4" y1="12" x2="4" y2="12" />
              </g>

              {/* ── Clock ── */}
              <g transform="translate(136,250)" {...ic}>
                <circle cx="0" cy="0" r="16" />
                <line x1="0" y1="0" x2="0" y2="-10" />
                <line x1="0" y1="0" x2="8" y2="5" />
                <circle cx="0" cy="0" r="1.5" />
              </g>

              {/* ── Magnifying glass ── */}
              <g transform="translate(198,242)" {...ic}>
                <circle cx="-2" cy="-2" r="12" />
                <line x1="7" y1="7" x2="16" y2="16" />
              </g>

              {/* ── Calculator ── */}
              <g transform="translate(268,234)" {...ic}>
                <rect x="0" y="0" width="28" height="36" rx="3" />
                <rect x="4" y="4" width="20" height="9" rx="1" />
                <circle cx="8" cy="20" r="2" />
                <circle cx="14" cy="20" r="2" />
                <circle cx="20" cy="20" r="2" />
                <circle cx="8" cy="28" r="2" />
                <circle cx="14" cy="28" r="2" />
                <circle cx="20" cy="28" r="2" />
              </g>

              {/* ── Graduation cap ── */}
              <g transform="translate(356,245)" {...ic}>
                <polygon points="0,-14 22,0 0,14 -22,0" />
                <path d="M-12 6 L-12 20 Q0 26 12 20 L12 6" />
                <line x1="22" y1="0" x2="22" y2="14" />
              </g>

              {/* ── Backpack ── */}
              <g transform="translate(56,348)" {...ic}>
                <rect x="-14" y="-8" width="28" height="28" rx="4" />
                <path d="M-6-8 Q-6-18 6-18 Q6-8 6-8" />
                <line x1="-14" y1="4" x2="14" y2="4" />
                <rect x="-6" y="6" width="12" height="9" rx="2" />
              </g>

              {/* ── Lightbulb ── */}
              <g transform="translate(144,348)" {...ic}>
                <path d="M-10-2 A14 14 0 0 1 10-2 C10 8 6 12 4 16 L-4 16 C-6 12-10 8-10-2Z" />
                <line x1="-5" y1="16" x2="-5" y2="22" />
                <line x1="5" y1="16" x2="5" y2="22" />
                <line x1="-5" y1="22" x2="5" y2="22" />
                <line x1="0" y1="-18" x2="0" y2="-22" />
                <line x1="12" y1="-12" x2="15" y2="-15" />
                <line x1="-12" y1="-12" x2="-15" y2="-15" />
              </g>

              {/* ── Triangle ruler ── */}
              <g transform="translate(232,355)" {...ic}>
                <polygon points="0,-24 24,14 -24,14" />
                <line x1="0" y1="-16" x2="-4" y2="-10" />
                <line x1="0" y1="-7" x2="-4" y2="-1" />
                <line x1="0" y1="2" x2="-4" y2="8" />
              </g>

              {/* ── Bell ── */}
              <g transform="translate(316,350)" {...ic}>
                <path d="M0-18 C-2-18-4-16-4-14 C-12-8-14 0-14 10 L14 10 C14 0 12-8 4-14 C4-16 2-18 0-18Z" />
                <line x1="-14" y1="10" x2="14" y2="10" />
                <path d="M-4 10 Q0 16 4 10" />
                <line x1="0" y1="-18" x2="0" y2="-22" />
              </g>

              {/* ── Microscope ── */}
              <g transform="translate(380,355)" {...ic}>
                <rect x="-5" y="-24" width="10" height="22" rx="2" />
                <line x1="-9" y1="-24" x2="9" y2="-24" />
                <ellipse cx="0" cy="-28" rx="4" ry="3" />
                <path d="M-5-2 L-12 14 L12 14 L5-2" />
                <line x1="-14" y1="14" x2="14" y2="14" />
              </g>

              {/* ── Small scattered sparkles ── */}
              <g
                stroke="#8b5cf6"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                strokeOpacity="0.08"
              >
                <line x1="92" y1="95" x2="92" y2="107" />
                <line x1="86" y1="101" x2="98" y2="101" />
                <line x1="88" y1="97" x2="96" y2="105" />
                <line x1="96" y1="97" x2="88" y2="105" />
                <line x1="168" y1="178" x2="168" y2="188" />
                <line x1="163" y1="183" x2="173" y2="183" />
                <line x1="386" y1="180" x2="386" y2="192" />
                <line x1="380" y1="186" x2="392" y2="186" />
                <line x1="82" y1="298" x2="82" y2="308" />
                <line x1="77" y1="303" x2="87" y2="303" />
                <line x1="390" y1="295" x2="390" y2="305" />
                <line x1="385" y1="300" x2="395" y2="300" />
                <circle cx="258" cy="78" r="2" />
                <circle cx="388" cy="88" r="2" />
                <circle cx="186" cy="98" r="2" />
                <circle cx="100" cy="192" r="2" />
                <circle cx="318" cy="192" r="2" />
              </g>

              {/* ── Text labels ── */}
              <text
                x="386"
                y="66"
                fontSize="13"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#8b5cf6"
                fillOpacity="0.09"
              >
                ABC
              </text>
              <text
                x="256"
                y="208"
                fontSize="13"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#8b5cf6"
                fillOpacity="0.09"
              >
                m²
              </text>
              <text
                x="160"
                y="302"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#8b5cf6"
                fillOpacity="0.09"
              >
                x=y
              </text>
              <text
                x="304"
                y="118"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#8b5cf6"
                fillOpacity="0.09"
              >
                HₒO
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodles)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="w-full max-w-sm space-y-6 relative">
        <div className="flex flex-col items-center gap-3">
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

        <div className="bg-card rounded-2xl border border-border shadow-sm px-8 py-8">
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

              {error && (
                <p className="text-sm text-destructive">
                  Invalid email or password.
                </p>
              )}

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

        <p className="text-center text-xs text-muted-foreground">
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
