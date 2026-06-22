export default function Logo({
  className = "",
  size = "text-xl",
  tone = "text-ink",
  accent = "text-chili",
}: {
  className?: string;
  size?: string;
  tone?: string;
  accent?: string;
}) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl leading-none">🍜</span>
      <span
        className={`font-display font-bold uppercase leading-none tracking-tight ${size} ${tone}`}
      >
        Nouilles <span className={accent}>Nouilles</span>
      </span>
    </span>
  );
}
