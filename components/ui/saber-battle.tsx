'use client'

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Anime-style laser-sword battle across the whole footer. Two tiny knights leap,
// cling to walls/ceiling/floor, kick off again, flip through the air, flash-step,
// and clash mid-air with hit-stop, screen shake, sparks and shockwaves.

const G = 1500            // gravity, px/s²
const R = 14              // half height of a knight
const CLASH_DIST = 34
const STANDOFF = 3        // seconds without a clash before they charge each other

type Surface = "floor" | "wall-l" | "wall-r" | "ceil" | null
type Knight = {
    x: number; y: number; vx: number; vy: number
    body: string; head: string; blade: string
    face: 1 | -1; spin: number; surface: Surface; wait: number
    swing: number; ghost: number; trail: { x: number; y: number; a: number }[]
}
type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string }
type Ring = { x: number; y: number; r: number; life: number }

const SURFACE_ROT: Record<Exclude<Surface, null>, number> = { floor: 0, ceil: Math.PI, "wall-l": Math.PI / 2, "wall-r": -Math.PI / 2 }

export function SaberBattle({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let w = 0, h = 0, raf = 0, visible = false, last = performance.now()
        let hitstop = 0, shake = 0, cooldown = 0, sinceClash = 0
        const sparks: Spark[] = []
        const rings: Ring[] = []

        const make = (body: string, head: string, blade: string): Knight => ({
            x: 0, y: 0, vx: 0, vy: 0, body, head, blade, face: 1, spin: 0,
            surface: "floor", wait: 0.3 + Math.random() * 0.4, swing: 0, ghost: 0, trail: [],
        })
        const A = make("#d4d4d8", "#f4f4f5", "#7dd3fc")
        const B = make("#71717a", "#a1a1aa", "#f87171")

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const first = w === 0
            w = canvas.clientWidth; h = canvas.clientHeight
            canvas.width = w * dpr; canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            if (first) {
                Object.assign(A, { x: w * 0.25, y: h - R })
                Object.assign(B, { x: w * 0.75, y: h - R })
            }
            for (const k of [A, B]) { k.x = Math.min(Math.max(k.x, R), w - R); k.y = Math.min(Math.max(k.y, R), h - R) }
        }

        const land = (k: Knight, s: Surface) => {
            k.surface = s; k.vx = 0; k.vy = 0; k.spin = 0
            k.wait = 0.12 + Math.random() * 0.35 // crouch, then kick off
        }

        const leap = (k: Knight, o: Knight, charge = false) => {
            // aim where the opponent will be, with some flair
            const tx = charge ? (k.x + o.x) / 2 : o.x + o.vx * 0.3 + (Math.random() - 0.5) * 140
            const ty = charge ? Math.min(k.y, o.y) - h * 0.25 : Math.min(o.y + o.vy * 0.3, h - R) - Math.random() * h * 0.35
            const dx = tx - k.x, dy = ty - k.y
            const d = Math.hypot(dx, dy) || 1
            const sp = charge ? 1100 : 650 + Math.random() * 500
            k.vx = (dx / d) * sp
            k.vy = (dy / d) * sp - 260
            k.surface = null
            // flash-step: jump a chunk of the way instantly, leaving afterimages
            if (!charge && Math.random() < 0.2) {
                k.ghost = 0.3
                for (let i = 1; i <= 5; i++) k.trail.push({ x: k.x + dx * 0.1 * i, y: k.y + dy * 0.1 * i, a: 1 })
                k.x += dx * 0.5; k.y += dy * 0.5
            }
        }

        const clash = () => {
            const dx = B.x - A.x, dy = B.y - A.y
            const d = Math.hypot(dx, dy) || 1
            const nx = dx / d, ny = dy / d
            const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2
            const kb = 520 + Math.random() * 300
            A.vx = -nx * kb; A.vy = -ny * kb - 220
            B.vx = nx * kb; B.vy = ny * kb - 220
            A.surface = B.surface = null
            A.swing = B.swing = 0.2
            hitstop = 0.08; shake = 0.18; cooldown = 0.3; sinceClash = 0
            rings.push({ x: mx, y: my, r: 4, life: 1 })
            for (let i = 0; i < 22; i++) {
                const a = Math.random() * Math.PI * 2, s = 150 + Math.random() * 450
                sparks.push({ x: mx, y: my, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.3 + Math.random() * 0.4, color: i % 3 === 0 ? A.blade : i % 3 === 1 ? B.blade : "#fff" })
            }
        }

        const update = (dt: number) => {
            shake = Math.max(0, shake - dt)
            for (const s of sparks) { s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 600 * dt; s.vx *= 0.96; s.life -= dt }
            for (const r of rings) { r.r += 260 * dt; r.life -= dt * 2.2 }
            for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].life <= 0) sparks.splice(i, 1)
            for (let i = rings.length - 1; i >= 0; i--) if (rings[i].life <= 0) rings.splice(i, 1)
            // hit-stop: the fighters freeze for a beat on impact, effects keep moving
            if (hitstop > 0) { hitstop -= dt; return }

            cooldown -= dt; sinceClash += dt
            const charge = sinceClash > STANDOFF

            for (const k of [A, B]) {
                const o = k === A ? B : A
                k.face = o.x >= k.x ? 1 : -1
                k.swing = Math.max(0, k.swing - dt)
                k.ghost = Math.max(0, k.ghost - dt)
                for (const t of k.trail) t.a -= dt * 3
                while (k.trail.length && k.trail[0].a <= 0) k.trail.shift()

                if (k.surface) {
                    k.wait -= dt
                    if (k.wait <= 0 || (charge && o.surface)) leap(k, o, charge)
                    continue
                }
                k.vy += G * dt
                k.x += k.vx * dt; k.y += k.vy * dt
                k.spin += dt * 16 * (k.vx >= 0 ? 1 : -1)
                if (Math.hypot(k.vx, k.vy) > 500) k.trail.push({ x: k.x, y: k.y, a: 0.6 })
                // bounce off the footer's edges by sticking, then kicking off again
                if (k.x < R) { k.x = R; land(k, "wall-l") }
                else if (k.x > w - R) { k.x = w - R; land(k, "wall-r") }
                else if (k.y < R) { k.y = R; land(k, "ceil") }
                else if (k.y > h - R) { k.y = h - R; land(k, "floor") }
            }
            if (charge && !A.surface && !B.surface) sinceClash = 0
            if (cooldown <= 0 && Math.hypot(B.x - A.x, B.y - A.y) < CLASH_DIST) clash()
        }

        const drawKnight = (k: Knight, alpha = 1) => {
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.translate(k.x, k.y)
            ctx.rotate(k.surface ? SURFACE_ROT[k.surface] : k.spin)
            ctx.scale(k.face, k.surface ? 0.82 : 1) // crouch squash while clinging
            ctx.lineCap = "round"
            ctx.strokeStyle = k.body; ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(0, 2); ctx.lineTo(-4.5, R)       // legs
            ctx.moveTo(0, 2); ctx.lineTo(4.5, R)
            ctx.moveTo(0, 2); ctx.lineTo(0, -6)         // torso
            ctx.stroke()
            ctx.fillStyle = k.head
            ctx.beginPath(); ctx.arc(0, -9.5, 4, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = "#09090b"; ctx.fillRect(1, -10.5, 3, 1.4) // visor / eyes

            // sword: idle guard, or a fast slash with a fading arc
            const p = k.swing > 0 ? 1 - k.swing / 0.2 : 0
            const ang = k.swing > 0 ? -2.3 + p * 3.6 : -0.7
            ctx.strokeStyle = k.body; ctx.lineWidth = 1.6
            ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(3.5, -2); ctx.stroke()
            if (k.swing > 0) {
                ctx.fillStyle = k.blade; ctx.globalAlpha = alpha * 0.25 * (1 - p)
                ctx.beginPath(); ctx.moveTo(3.5, -2); ctx.arc(3.5, -2, 20, -2.3, ang); ctx.closePath(); ctx.fill()
                ctx.globalAlpha = alpha
            }
            const ex = 3.5 + Math.cos(ang) * 19, ey = -2 + Math.sin(ang) * 19
            ctx.shadowColor = k.blade; ctx.shadowBlur = 10
            ctx.strokeStyle = k.blade; ctx.lineWidth = 2.4
            ctx.beginPath(); ctx.moveTo(3.5, -2); ctx.lineTo(ex, ey); ctx.stroke()
            ctx.shadowBlur = 0
            ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.9
            ctx.beginPath(); ctx.moveTo(3.5, -2); ctx.lineTo(ex, ey); ctx.stroke()
            ctx.restore()
        }

        const draw = () => {
            ctx.clearRect(0, 0, w, h)
            ctx.save()
            if (shake > 0) ctx.translate((Math.random() - 0.5) * 6 * (shake / 0.18), (Math.random() - 0.5) * 6 * (shake / 0.18))

            // speed lines and afterimages
            for (const k of [A, B]) {
                for (const t of k.trail) {
                    ctx.fillStyle = k.blade
                    ctx.globalAlpha = Math.max(0, t.a) * 0.35
                    ctx.beginPath(); ctx.arc(t.x, t.y, 6, 0, Math.PI * 2); ctx.fill()
                }
                ctx.globalAlpha = 1
                if (k.ghost > 0) k.trail.slice(-5).forEach((t, i) => drawKnight({ ...k, x: t.x, y: t.y }, 0.12 * (i + 1)))
            }
            drawKnight(A); drawKnight(B)

            for (const r of rings) {
                ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, r.life) * 0.8})`
                ctx.lineWidth = 2 * Math.max(0, r.life)
                ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke()
            }
            ctx.lineCap = "round"
            for (const s of sparks) {
                ctx.strokeStyle = s.color
                ctx.globalAlpha = Math.min(1, s.life * 3)
                ctx.lineWidth = 1.4
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 0.02, s.y - s.vy * 0.02); ctx.stroke()
            }
            ctx.restore()
        }

        const loop = (now: number) => {
            update(Math.min((now - last) / 1000, 0.033)); last = now
            draw()
            raf = visible ? requestAnimationFrame(loop) : 0
        }

        resize(); draw()
        const ro = new ResizeObserver(() => { resize(); draw() })
        ro.observe(canvas)
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting && !reduceMotion
            if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop) }
        })
        io.observe(canvas)
        return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
    }, [])

    return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none block w-full h-full", className)} />
}
