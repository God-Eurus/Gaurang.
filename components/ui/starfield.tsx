'use client'

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Flying-through-space starfield. Stars stream toward the viewer; at higher
// speeds they draw as streaks (warp). With `scrollBoost`, speed climbs as the
// canvas scrolls out of view so the hero "launches" into the next section.

type Props = {
    speed?: number       // base forward speed (depth units / second)
    scrollBoost?: boolean
    velocityBoost?: boolean // warp while the page is scrolled quickly
    count?: number
    className?: string
}

export function Starfield({ speed = 0.25, scrollBoost = false, velocityBoost = false, count = 600, className }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let w = 0, h = 0, raf = 0, visible = true, last = performance.now()
        // pointer parallax: vanishing point leans toward the cursor
        let px = 0, py = 0, tx = 0, ty = 0
        let lastY = window.scrollY, warp = 0

        const spawn = (z = Math.random()) => ({ x: (Math.random() * 2 - 1), y: (Math.random() * 2 - 1), z: Math.max(z, 0.02), pz: z, tw: Math.random() * Math.PI * 2 })
        // scale star count with screen width: phones get ~30-40% of the stars
        const stars = Array.from({ length: Math.max(120, Math.round(count * Math.min(1, innerWidth / 1440))) }, () => spawn())

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = canvas.clientWidth; h = canvas.clientHeight
            canvas.width = w * dpr; canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const frame = (dt: number) => {
            let v = speed
            if (scrollBoost) {
                const r = canvas.getBoundingClientRect()
                v *= 1 + Math.min(Math.max(-r.top / r.height, 0), 1) * 8
            }
            if (velocityBoost && dt > 0) {
                // scroll speed (px/s) eases into a warp factor and decays when scrolling stops
                const target = Math.min(Math.abs(window.scrollY - lastY) / dt / 300, 10)
                lastY = window.scrollY
                warp += (target - warp) * Math.min(1, dt * 6)
                v *= 1 + warp
            }
            px += (tx - px) * 0.05; py += (ty - py) * 0.05
            const cx = w / 2 + px * w * 0.04, cy = h / 2 + py * h * 0.04
            const f = Math.max(w, h) * 0.5

            ctx.clearRect(0, 0, w, h)
            ctx.lineCap = "round"
            for (const s of stars) {
                s.pz = s.z
                s.z -= v * dt
                s.tw += dt * 2
                if (s.z <= 0.02) Object.assign(s, spawn(1))
                const sx = cx + (s.x / s.z) * f, sy = cy + (s.y / s.z) * f
                if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) { Object.assign(s, spawn(1)); continue }
                const ox = cx + (s.x / s.pz) * f, oy = cy + (s.y / s.pz) * f
                const near = 1 - s.z
                const alpha = Math.min(1, 0.25 + near * 1.4) * (0.7 + Math.sin(s.tw) * 0.3)
                const size = 0.5 + near * 2.2
                ctx.strokeStyle = `rgba(230,240,255,${alpha})`
                ctx.lineWidth = size
                ctx.beginPath()
                // streak length follows speed; at low speed this collapses to a dot
                ctx.moveTo(ox, oy)
                ctx.lineTo(sx + 0.01, sy)
                ctx.stroke()
            }
        }

        const loop = (now: number) => {
            frame(Math.min((now - last) / 1000, 0.05)); last = now
            raf = visible ? requestAnimationFrame(loop) : 0
        }
        const onPointer = (e: PointerEvent) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5 }

        resize(); frame(0)
        const ro = new ResizeObserver(() => { resize(); frame(0) })
        ro.observe(canvas)
        // only animate while on screen
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting && !reduceMotion
            if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop) }
        })
        io.observe(canvas)
        addEventListener("pointermove", onPointer)

        return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener("pointermove", onPointer) }
    }, [speed, scrollBoost, velocityBoost, count])

    return <canvas ref={canvasRef} aria-hidden className={cn("block w-full h-full", className)} />
}
