import { cn } from "@/lib/utils"

// Ring space station, pure SVG. The ring spins slowly around its hub and the
// whole station drifts (CSS only, no JS).
export function SpaceStation({ className }: { className?: string }) {
    const spin = { transformBox: "fill-box" as const, transformOrigin: "center" }
    return (
        <svg aria-hidden viewBox="0 0 240 240" className={cn("pointer-events-none overflow-visible animate-[drift_40s_ease-in-out_infinite] motion-reduce:animate-none", className)}>
            <defs>
                <linearGradient id="ss-panel" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3f3f46" />
                    <stop offset="100%" stopColor="#18181b" />
                </linearGradient>
            </defs>

            {/* central axis */}
            <rect x="112" y="20" width="16" height="200" rx="5" fill="#27272a" stroke="#52525b" strokeWidth="1" />
            <rect x="106" y="34" width="28" height="14" rx="3" fill="#3f3f46" />
            <rect x="106" y="192" width="28" height="14" rx="3" fill="#3f3f46" />
            {/* docking antenna */}
            <line x1="120" y1="20" x2="120" y2="4" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="120" cy="3" r="2" fill="#fff" className="animate-pulse" />

            {/* solar arrays */}
            {[-1, 1].map((s) => (
                <g key={s}>
                    <line x1="120" y1="120" x2={120 + s * 96} y2="120" stroke="#52525b" strokeWidth="2" />
                    {[0, 1].map((i) => (
                        <g key={i}>
                            <rect x={s > 0 ? 160 + i * 26 : 56 - i * 26} y="96" width="22" height="48" fill="url(#ss-panel)" stroke="#71717a" strokeWidth="0.8" />
                            <line x1={s > 0 ? 171 + i * 26 : 67 - i * 26} y1="96" x2={s > 0 ? 171 + i * 26 : 67 - i * 26} y2="144" stroke="#52525b" strokeWidth="0.6" />
                            <line x1={s > 0 ? 160 + i * 26 : 56 - i * 26} y1="120" x2={s > 0 ? 182 + i * 26 : 78 - i * 26} y2="120" stroke="#52525b" strokeWidth="0.6" />
                        </g>
                    ))}
                </g>
            ))}

            {/* rotating habitat ring with spokes and lit windows */}
            <g className="animate-[spin_60s_linear_infinite] motion-reduce:animate-none" style={spin}>
                <circle cx="120" cy="120" r="78" fill="none" stroke="#3f3f46" strokeWidth="12" />
                <circle cx="120" cy="120" r="78" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="3 9" opacity="0.8" />
                <circle cx="120" cy="120" r="84" fill="none" stroke="#52525b" strokeWidth="1" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <line key={deg} x1="120" y1="120" x2="120" y2="48" stroke="#52525b" strokeWidth="2.5" transform={`rotate(${deg} 120 120)`} />
                ))}
            </g>

            {/* hub */}
            <circle cx="120" cy="120" r="18" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="7" fill="#52525b" />
            {/* nav lights */}
            <circle cx="198" cy="120" r="2" fill="#f87171" className="animate-pulse" />
            <circle cx="42" cy="120" r="2" fill="#7dd3fc" className="animate-pulse" />
        </svg>
    )
}
