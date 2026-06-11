import logo from "@/assets/jemassur-logo.png";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Jemassur"
      className={className}
      style={{
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
      }}
    />
  );
}
