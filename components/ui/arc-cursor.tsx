'use client'

import { useEffect, useRef } from "react"

// Crackling electric arc that trails the cursor. Only active for fine pointers
// without reduced motion; globals.css hides the native cursor under the same query.

const TRAIL_MS = 220
const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)"

export function ArcCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!window.matchMedia(QUERY).matches) return
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!
        const trail: { x: number; y: number; t: number }[] = []
        let raf = 0, inside = false

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        const onMove = (e: PointerEvent) => { inside = true; trail.push({ x: e.clientX, y: e.clientY, t: performance.now() }) }
        const onLeave = () => { inside = false; trail.length = 0 }

        // one jagged bolt between two points, offsets perpendicular to the segment
        const bolt = (ax: number, ay: number, bx: number, by: number, amp: number) => {
            const dx = bx - ax, dy = by - ay
            const len = Math.hypot(dx, dy) || 1
            const nx = -dy / len, ny = dx / len
            const segs = Math.max(2, Math.round(len / 8))
            ctx.lineTo(ax, ay)
            for (let i = 1; i < segs; i++) {
                const k = i / segs, j = (Math.random() - 0.5) * amp
                ctx.lineTo(ax + dx * k + nx * j, ay + dy * k + ny * j)
            }
            ctx.lineTo(bx, by)
        }

        const stroke = (width: number, color: string, blur: number) => {
            ctx.lineWidth = width; ctx.strokeStyle = color
            ctx.shadowBlur = blur; ctx.shadowColor = "rgba(228,228,231,0.9)"
            ctx.stroke()
        }

        const loop = () => {
            const now = performance.now()
            while (trail.length > 1 && now - trail[0].t > TRAIL_MS) trail.shift()
            ctx.clearRect(0, 0, innerWidth, innerHeight)
            const head = trail[trail.length - 1]

            if (inside && head) {
                ctx.lineJoin = "round"; ctx.lineCap = "round"
                if (trail.length > 1) {
                    ctx.beginPath()
                    for (let i = 1; i < trail.length; i++) bolt(trail[i - 1].x, trail[i - 1].y, trail[i].x, trail[i].y, 10)
                    stroke(3, "rgba(212,212,216,0.35)", 18)
                    stroke(1.2, "rgba(255,255,255,0.95)", 6)
                }
                // idle crackle: a couple of short sparks off the tip
                if (Math.random() < 0.35) {
                    ctx.beginPath()
                    const a = Math.random() * Math.PI * 2, r = 8 + Math.random() * 10
                    ctx.moveTo(head.x, head.y)
                    bolt(head.x, head.y, head.x + Math.cos(a) * r, head.y + Math.sin(a) * r, 5)
                    stroke(1, "rgba(255,255,255,0.8)", 8)
                }
                ctx.beginPath()
                ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2)
                ctx.fillStyle = "#fff"; ctx.shadowBlur = 14
                ctx.fill()
            }
            raf = requestAnimationFrame(loop)
        }

        resize()
        addEventListener("resize", resize)
        addEventListener("pointermove", onMove)
        document.documentElement.addEventListener("pointerleave", onLeave)
        raf = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(raf)
            removeEventListener("resize", resize)
            removeEventListener("pointermove", onMove)
            document.documentElement.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9999] w-full h-full" />
}
