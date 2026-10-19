'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import { projects, type Project } from '@/lib/projects'


// deterministic pseudo-random in [-1, 1]
const drift = (i: number, k: number) => Math.sin(i * 12.9898 + k * 78.233)

// zero-gravity scatter on desktop: hand-placed so cards never collide, deliberately uneven spacing and sizes
const SCATTER = [
    { x: "0%", y: "0%", w: "280px" },
    { x: "38%", y: "6%", w: "240px" },
    { x: "71%", y: "2%", w: "270px" },
    { x: "18%", y: "31%", w: "260px" },
    { x: "64%", y: "39%", w: "280px" },
    { x: "2%", y: "63%", w: "290px" },
    { x: "50%", y: "74%", w: "250px" },
]

const STARLIGHT = "230,240,255"

// deep space: nebula haze and a distant sun that rim-lights the cards (stars come from the page-wide field)
function SpaceBackdrop() {
    const reduceMotion = useReducedMotion()
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* distant sun, top right: the light source for every card's rim */}
            <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(230,240,255,0.05)_35%,transparent_70%)]" />
            {/* nebula haze banks */}
            {[
                { left: "-15%", top: "10%", size: 800, dur: 50 },
                { left: "50%", top: "45%", size: 900, dur: 60 },
                { left: "5%", top: "72%", size: 700, dur: 55 },
            ].map((b, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-3xl"
                    style={{ left: b.left, top: b.top, width: b.size, height: b.size * 0.55, background: `radial-gradient(ellipse at center, rgba(${STARLIGHT},0.07), rgba(161,161,170,0.03) 45%, transparent 70%)` }}
                    animate={reduceMotion ? undefined : { x: [0, 140, -70, 0], y: [0, -50, 30, 0], rotate: [0, 8, -5, 0] }}
                    transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </div>
    )
}

// `still`: no drag or idle float (used inside the mobile carousel, where swipes scroll)
function ProjectCard({ project, index, still = false }: { project: Project; index: number; still?: boolean }) {
    const reduceMotion = useReducedMotion()
    const ringed = index % 3 === 1
    const dragged = useRef(false)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 18 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 })
    // glare follows the cursor across the card surface
    const glare = useTransform([x, y], ([gx, gy]: number[]) =>
        `radial-gradient(circle at ${(gx + 0.5) * 100}% ${(gy + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 60%)`)

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduceMotion) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => { x.set(0); y.set(0) }

    return (
        <motion.div
            // drifts in out of the deep (transform + opacity only: GPU-cheap, no filter blur)
            initial={still ? false : { opacity: 0, scale: 0.85, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200, "--x": SCATTER[index % SCATTER.length].x, "--y": SCATTER[index % SCATTER.length].y, "--w": SCATTER[index % SCATTER.length].w } as React.CSSProperties}
            className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:absolute lg:left-(--x) lg:top-(--y) lg:w-(--w)"
        >
            {/* zero gravity: fling a card around, it drifts back to its spot */}
            <motion.div
                drag={!reduceMotion && !still}
                dragSnapToOrigin
                dragElastic={0.5}
                dragTransition={{ bounceStiffness: 40, bounceDamping: 9 }}
                whileDrag={{ scale: 1.06, zIndex: 50 }}
                onPointerDown={() => { dragged.current = false }}
                onDragStart={() => { dragged.current = true }}
                className="relative touch-pan-y"
            >
                {/* free float: each card wanders its own looping path; seeded by index so SSR and client match */}
                <motion.div
                    animate={reduceMotion || still ? undefined : {
                        x: [0, drift(index, 1) * 14, drift(index, 2) * -12, drift(index, 3) * 10, 0],
                        y: [0, drift(index, 4) * -18, drift(index, 8) * 12, drift(index, 9) * -10, 0],
                        rotate: [0, drift(index, 5) * 3, drift(index, 6) * -2.5, drift(index, 7) * 2, 0],
                    }}
                    transition={{ duration: 14 + (index % 4) * 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.9 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.div
                        onMouseMove={onMove}
                        onMouseLeave={onLeave}
                        whileHover={{ scale: 1.04 }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="group relative aspect-square rounded-full border border-zinc-800/60 bg-zinc-950 shadow-[0_0_40px_rgba(230,240,255,0.12),0_30px_60px_-20px_rgba(0,0,0,0.9)] hover:shadow-[0_0_70px_rgba(230,240,255,0.25),0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-shadow duration-500"
                    >
                        {ringed && (
                            <div
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 top-[36%] w-[155%] h-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] rounded-[50%] border-[3px] border-zinc-400/35 shadow-[0_0_18px_rgba(230,240,255,0.15)]"
                                style={{ transform: "translateZ(-20px)" }}
                            />
                        )}

                        {/* slab thickness: stacked layers behind the face show as an edge when tilted */}
                        {[3, 6, 9, 12].map((d) => (
                            <div
                                key={d}
                                aria-hidden
                                className="absolute inset-0 rounded-full border border-zinc-800 bg-zinc-900"
                                style={{ transform: `translateZ(-${d}px)` }}
                            />
                        ))}

                        <Link
                            href={project.link}
                            target="_blank"
                            draggable={false}
                            onClick={(e) => { if (dragged.current) e.preventDefault() }}
                            // inside the 3D tilt, z-index is ignored and layers sort by depth:
                            // lift the link above the raised title/arrow so the whole planet is clickable
                            style={{ transform: "translateZ(90px)" }}
                            className="absolute inset-0 z-40 rounded-full"
                        >
                            <span className="sr-only">View {project.title}</span>
                        </Link>

                        <div className="absolute inset-0 overflow-hidden rounded-full">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                draggable={false}
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            {/* sphere shading: lit from the distant sun (top right), night side bottom left */}
                            <div
                                className="absolute inset-0"
                                style={{ background: `radial-gradient(circle at 68% 28%, rgba(${STARLIGHT},0.28) 0%, transparent 32%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.85) 88%)` }}
                            />
                        </div>

                        <div
                            style={{ transform: "translateZ(30px)" }}
                            className="pointer-events-none hidden md:block absolute top-[9%] left-1/2 -translate-x-1/2 p-2 rounded-full border border-white/20 bg-black/60 text-zinc-300 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </div>

                        <div style={{ transform: "translateZ(60px)" }} className="pointer-events-none absolute inset-x-[14%] bottom-[15%] text-center">
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                {project.title}
                            </h3>
                            {/* description revealed on hover for mouse users; always visible on touch screens */}
                            <p className={`${still ? "hidden" : ""} text-zinc-300 text-xs leading-snug line-clamp-2 mb-3 pointer-fine:max-h-0 pointer-fine:opacity-0 pointer-fine:mb-0 pointer-fine:group-hover:max-h-12 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:mb-3 transition-all duration-500`}>
                                {project.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-zinc-300 border border-white/15 bg-black/50 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {ringed && (
                            <div
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 top-[36%] z-30 w-[155%] h-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] rounded-[50%] border-[3px] border-zinc-300/50 [clip-path:inset(50%_0_0_0)]"
                            />
                        )}

                        {/* atmosphere rim on the sun-facing edge */}
                        <div className="pointer-events-none absolute inset-0 z-30 rounded-full shadow-[inset_-2px_2px_6px_rgba(230,240,255,0.35),inset_0_0_20px_rgba(230,240,255,0.08)]" />

                        <motion.div
                            style={{ background: glare }}
                            className="pointer-events-none absolute inset-0 z-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

// Phones: 3D coverflow. Native scroll-snap does the swiping; each card's tilt,
// scale and fade come from its live distance to the centre of the strip.
function MobileCarousel() {
    const stripRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const strip = stripRef.current!
        let raf = 0
        const update = () => {
            raf = 0
            const mid = strip.scrollLeft + strip.clientWidth / 2
            let best = 0, bestD = Infinity
            Array.from(strip.children).forEach((el, i) => {
                const card = el as HTMLElement
                const d = (card.offsetLeft + card.offsetWidth / 2 - mid) / card.offsetWidth
                const c = Math.max(-1, Math.min(1, d))
                // pivot on the edge facing the centre so neighbours swing back but still peek in
                card.style.transformOrigin = c > 0 ? "left center" : "right center"
                card.style.transform = `perspective(900px) translateX(${c * -24}px) rotateY(${c * -32}deg) scale(${1 - Math.abs(c) * 0.1})`
                card.style.opacity = String(1 - Math.abs(c) * 0.4)
                card.style.zIndex = String(10 - Math.round(Math.abs(c) * 5))
                if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i }
            })
            setActive(best)
        }
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
        raf = requestAnimationFrame(update)
        strip.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => { cancelAnimationFrame(raf); strip.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll) }
    }, [])

    const go = (i: number) => {
        const strip = stripRef.current!
        const card = strip.children[Math.max(0, Math.min(projects.length - 1, i))] as HTMLElement
        strip.scrollTo({ left: card.offsetLeft - (strip.clientWidth - card.offsetWidth) / 2, behavior: "smooth" })
    }

    return (
        <div className="md:hidden -mx-4" aria-roledescription="carousel" aria-label="Selected works">
            <div
                ref={stripRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-[21vw] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.title}
                        className="snap-center shrink-0 w-[58vw] max-w-[260px] will-change-transform"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${projects.length}`}
                    >
                        <ProjectCard project={project} index={index} still />
                    </div>
                ))}
            </div>

            <div className="mt-2 flex items-center justify-center gap-4">
                <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" className="grid place-items-center w-10 h-10 rounded-full border border-zinc-800 text-zinc-300 disabled:opacity-30">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                    {projects.map((p, i) => (
                        <button
                            key={p.title}
                            type="button"
                            onClick={() => go(i)}
                            aria-label={`Go to ${p.title}`}
                            aria-current={active === i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-white" : "w-1.5 bg-zinc-700"}`}
                        />
                    ))}
                </div>
                <button type="button" onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label="Next project" className="grid place-items-center w-10 h-10 rounded-full border border-zinc-800 text-zinc-300 disabled:opacity-30">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            {/* caption for the planet in focus */}
            <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-4 max-w-xs min-h-[3.75rem] px-6 text-center text-sm leading-relaxed text-zinc-400"
            >
                {projects[active].description}
            </motion.p>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · swipe
            </p>
        </div>
    )
}

export function Projects() {
    return (
        <section className="relative w-full overflow-hidden selection:bg-zinc-800 selection:text-white">
            <SpaceBackdrop />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 md:pt-40 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto w-fit mb-6 md:mb-24 text-center"
                >
                    <p className="mb-4 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-500">
                        Chapter 04 · Orbit
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 tracking-tighter uppercase">
                        Selected Works
                    </h2>
                    <p className="mt-4 text-zinc-500 text-xs md:text-sm font-medium uppercase tracking-widest">
                        Everything I&apos;ve launched, drifting in zero gravity.
                    </p>
                    <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                        <span className="md:hidden">Swipe through the fleet</span>
                        <span className="hidden md:inline">Grab a project and fling it</span>
                    </p>
                </motion.div>

                <MobileCarousel />
                {/* tablets: 2-column grid; desktop: free-floating scatter */}
                <div className="hidden md:grid md:grid-cols-2 gap-x-8 gap-y-14 lg:block lg:relative lg:h-[1300px]">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
