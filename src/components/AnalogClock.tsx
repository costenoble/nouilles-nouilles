"use client";

export default function AnalogClock({ time }: { time: string }) {
  const [h, m] = time.split(":").map(Number);
  const minuteAngle = (m / 60) * 360;
  const hourAngle = ((h % 12) / 12) * 360 + (m / 60) * 30;

  const handStyle = (angle: number): React.CSSProperties => ({
    transformOrigin: "100px 100px",
    transform: `rotate(${angle}deg)`,
    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="aspect-square w-full max-w-[240px]">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {/* face */}
          <circle cx="100" cy="100" r="96" fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="var(--color-line)" strokeWidth="1" opacity="0.5" />

          {/* hour ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r = (n: number) => Math.round(n * 100) / 100;
            const x1 = r(100 + Math.sin(a) * 82);
            const y1 = r(100 - Math.cos(a) * 82);
            const x2 = r(100 + Math.sin(a) * (i % 3 === 0 ? 72 : 77));
            const y2 = r(100 - Math.cos(a) * (i % 3 === 0 ? 72 : 77));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-ink)"
                strokeWidth={i % 3 === 0 ? 2.4 : 1.2}
                strokeLinecap="round"
                opacity={i % 3 === 0 ? 0.8 : 0.35}
              />
            );
          })}

          {/* hour hand */}
          <line x1="100" y1="100" x2="100" y2="58" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" style={handStyle(hourAngle)} />
          {/* minute hand */}
          <line x1="100" y1="100" x2="100" y2="34" stroke="var(--color-chili)" strokeWidth="3.5" strokeLinecap="round" style={handStyle(minuteAngle)} />
          <circle cx="100" cy="100" r="6" fill="var(--color-chili)" />
          <circle cx="100" cy="100" r="2.5" fill="var(--color-paper)" />
        </svg>
      </div>

      <span
        className="font-display text-3xl text-ink-soft"
        style={{ fontVariationSettings: '"opsz" 36, "SOFT" 100, "wght" 360', letterSpacing: "0.04em" }}
      >
        {time}
      </span>
    </div>
  );
}
