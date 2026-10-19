'use client'

import { useState } from 'react'
import { Code2, Palette, ShoppingBag } from 'lucide-react'
import { stack } from '@/lib/projects'
import { cn } from '@/lib/utils'

// split the stack across three rings, inner ring smallest
const RINGS = [
    { r: 20, dur: 38, items: stack.slice(0, 3) },
    { r: 32, dur: 55, items: stack.slice(3, 7) },
    { r: 41, dur: 75, items: stack.slice(7) },
]

// each capability lights up the tools it uses on the orbit
const CAPABILITIES = [
    { icon: Palette, title: "Design & motion", body: "Visual direction, interaction ideas and animation that gives a brand a pulse.", tools: ["Framer Motion", "GSAP", "Tailwind CSS"] },
    { icon: Code2, title: "Frontend engineering", body: "Fast, accessible React and Next.js builds, from landing pages to full web apps.", tools: ["Next.js", "React", "Radix UI", "WebRTC", "AWS Amplify", "Tailwind CSS"] },
    { icon: ShoppingBag, title: "Commerce", body: "Custom Shopify themes in Liquid, built around the products and the story.", tools: ["Shopify", "Liquid"] },
]

// Chapter 03: what's on board. Tech stack orbits a core (CSS animation; ring radii
// use container-query units so the orbit scales). Hovering or tapping a
// capability highlights its tools and freezes the orbit.
export function Payload() {
    const [focus, setFocus] = useState<string | null>(null)
    const lit = CAPABILITIES.find((c) => c.title === focus)?.tools
    const paused: React.CSSProperties = focus ? { animationPlayState: "paused" } : {}

    return (
        <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
                <div>
                    <p className="mb-4 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-500">Chapter 03 · Payload</p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">
                        What&apos;s on board
                    </h2>
                    <p className="mt-5 max-w-md text-zinc-400 leading-relaxed">
                        The kit every mission in this portfolio was built with. Point at a capability to see what powers it.
                    </p>

                    <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-1" onMouseLeave={() => setFocus(null)}>
                        {CAPABILITIES.map(({ icon: Icon, title, body }) => {
                            const active = focus === title
                            return (
                                <li key={title}>
                                    <button
                                        type="button"
                                        aria-pressed={active}
                                        onMouseEnter={() => setFocus(title)}
                                        onFocus={() => setFocus(title)}
                                        onClick={() => setFocus(title)}
                                        className={cn(
                                            "group w-full h-full text-left flex md:flex-col lg:flex-row gap-4 rounded-2xl border p-5 transition-all duration-300",
                                            active ? "border-zinc-500 bg-zinc-900/80 shadow-[0_0_40px_rgba(230,240,255,0.08)]" : "border-zinc-900 bg-zinc-950/60 hover:border-zinc-700",
                                        )}
                                    >
                                        <span className={cn(
                                            "grid place-items-center shrink-0 w-10 h-10 rounded-full border transition-colors",
                                            active ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-300",
                                        )}>
                                            <Icon className="w-4 h-4" />
                                        </span>
                                        <span>
                                            <span className="block font-semibold text-white">{title}</span>
                                            <span className="mt-1 block text-sm text-zinc-400 leading-relaxed">{body}</span>
                                        </span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div aria-label={`Tech stack: ${stack.join(", ")}`} role="img" className="group/orbit relative mx-auto w-full max-w-[420px] md:max-w-[480px] lg:max-w-[540px] aspect-square [container-type:inline-size]">
                    {RINGS.map((ring) => (
                        <div
                            key={ring.r}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-800"
                            style={{ width: `${ring.r * 2}cqw`, height: `${ring.r * 2}cqw` }}
                        />
                    ))}
                    <div className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-[22cqw] h-[22cqw] rounded-full bg-[radial-gradient(circle_at_35%_30%,#3f3f46,#09090b_70%)] border border-zinc-700 transition-shadow duration-500",
                        focus ? "shadow-[0_0_90px_rgba(230,240,255,0.3)]" : "shadow-[0_0_60px_rgba(230,240,255,0.12)]",
                    )}>
                        <span className="text-[5cqw] font-bold tracking-tighter text-white">G.</span>
                    </div>
                    {/* ring spins, each chip counter-spins to stay upright; hover or a focused capability pauses both */}
                    {RINGS.map((ring, ri) => (
                        <div
                            key={ri}
                            className="absolute inset-0 animate-[spin_var(--dur)_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none"
                            style={{ "--dur": `${ring.dur}s`, animationDirection: ri % 2 ? "reverse" : "normal", ...paused } as React.CSSProperties}
                        >
                            {ring.items.map((item, i) => {
                                const deg = (360 / ring.items.length) * i + ri * 25
                                const on = lit?.includes(item)
                                return (
                                    <div
                                        key={item}
                                        className="absolute left-1/2 top-1/2"
                                        style={{ transform: `rotate(${deg}deg) translateX(${ring.r}cqw) rotate(${-deg}deg)` }}
                                    >
                                        <span
                                            className="block -translate-x-1/2 -translate-y-1/2 animate-[spin_var(--dur)_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none"
                                            style={{ "--dur": `${ring.dur}s`, animationDirection: ri % 2 ? "normal" : "reverse", ...paused } as React.CSSProperties}
                                        >
                                            <span className={cn(
                                                "block whitespace-nowrap rounded-full border px-2 py-1 sm:px-3 sm:py-1.5 font-mono text-[9px] sm:text-xs uppercase tracking-wider transition-all duration-300",
                                                on ? "scale-110 border-white bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.6)]"
                                                    : lit ? "border-zinc-900 bg-black text-zinc-700"
                                                        : "border-zinc-700 bg-black text-zinc-200 shadow-[0_0_20px_rgba(0,0,0,0.9)]",
                                            )}>
                                                {item}
                                            </span>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
