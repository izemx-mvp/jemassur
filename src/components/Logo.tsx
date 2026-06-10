import logo from "@/assets/jemassur-logo.png";

export function Logo({ className = "h-9" }: { className?: string }) {
  return <img src={logo} alt="Jemassur" className={className} />;
}
