'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CHAPTERS } from '@/lib/chapters'


// fixed chapter rail: progress line fills with page scroll, current chapter highlighted
export function StoryRail() {
    const { scrollYProgress } = useScroll()
    const shipTop = useTransform(scrollYProgress, (v) => `${v * 100}%`)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) setActive(CHAPTERS.findIndex((c) => c.id === e.target.id))
            }
        }, { rootMargin: '-45% 0px -45% 0px' })
        CHAPTERS.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el) })
        return () => io.disconnect()
    }, [])

    return (
        <nav aria-label="Story chapters" className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
            <div className="relative h-80 w-px bg-zinc-800">
                <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-white/70" />
                {/* the visitor's ship, riding the head of the progress line */}
                <motion.div style={{ top: shipTop }} className="absolute left-0 -translate-x-[calc(50%+14px)] -translate-y-1/2 text-white">
                    <Rocket className="w-3.5 h-3.5 rotate-135 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </motion.div>
                {CHAPTERS.map((c, i) => (
                    <a
                        key={c.id}
                        href={`#${c.id}`}
                        aria-current={active === i ? 'step' : undefined}
                        className="group absolute left-0 -translate-x-1/2 -translate-y-1/2 flex items-center"
                        style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%` }}
                    >
                        <span className={cn(
                            'block rounded-full border transition-all duration-500',
                            active === i ? 'w-3 h-3 bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'w-2 h-2 bg-black border-zinc-600',
                        )} />
                        <span className={cn(
                            'absolute left-5 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] font-mono transition-colors duration-500',
                            active === i ? 'text-white' : 'text-zinc-600',
                        )}>
                            {c.n}
                            {/* full chapter name only on hover, so the rail never sits on top of content */}
                            <span className="ml-2 px-2 py-1 rounded-full bg-black/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                                {c.label}
                            </span>
                        </span>
                    </a>
                ))}
            </div>
        </nav>
    )
}
