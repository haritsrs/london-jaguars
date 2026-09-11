export function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "gold" | "dark" }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}
