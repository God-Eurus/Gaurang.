'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'

// Pulls its child toward the cursor while hovered, springs back on leave.
// Mouse only: on touch there is no hover, so it simply does nothing.
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
    const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
    const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })

    return (
        <motion.div
            className={className ?? "inline-block"}
            style={{ x, y }}
            onPointerMove={(e) => {
                if (e.pointerType !== "mouse") return
                const r = e.currentTarget.getBoundingClientRect()
                x.set((e.clientX - (r.left + r.width / 2)) * strength)
                y.set((e.clientY - (r.top + r.height / 2)) * strength)
            }}
            onPointerLeave={() => { x.set(0); y.set(0) }}
        >
            {children}
        </motion.div>
    )
}
