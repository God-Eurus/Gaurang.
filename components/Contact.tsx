'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Magnetic } from '@/components/ui/magnetic'
import { Send } from 'lucide-react'
import { SOCIALS, external } from '@/lib/socials'
import { useForm, ValidationError } from '@formspree/react'

// little alien strolling over the horizon; legs swing from the hips, body bobs each step
function Alien({ walking }: { walking: boolean }) {
    const step = { duration: 0.5, repeat: Infinity, ease: "easeInOut" } as const
    return (
        <svg width="26" height="34" viewBox="0 0 24 32" className="overflow-visible drop-shadow-[0_0_6px_rgba(230,240,255,0.35)]">
            <motion.g animate={walking ? { y: [0, -0.8, 0] } : undefined} transition={{ ...step, duration: 0.25 }}>
                {/* antenna with a glowing tip */}
                <line x1="12" y1="6" x2="13.5" y2="1.5" stroke="#d4d4d8" strokeWidth="0.8" strokeLinecap="round" />
                <motion.circle
                    cx="13.5" cy="1.5" r="1.2" fill="#fff"
                    animate={walking ? { opacity: [1, 0.4, 1] } : undefined}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ filter: "drop-shadow(0 0 2px #fff)" }}
                />
                {/* head, eyes looking ahead (to the right) */}
                <ellipse cx="12" cy="10" rx="6" ry="5" fill="#d4d4d8" />
                <ellipse cx="11" cy="10.3" rx="1.5" ry="2" fill="#09090b" />
                <ellipse cx="15" cy="10.3" rx="1.5" ry="2" fill="#09090b" />
                <circle cx="11.5" cy="9.6" r="0.45" fill="#fff" />
                <circle cx="15.5" cy="9.6" r="0.45" fill="#fff" />
                {/* body and arms */}
                <rect x="8.5" y="14.5" width="7" height="8.5" rx="3" fill="#a1a1aa" />
                <motion.line
                    x1="9" y1="16.5" x2="6.5" y2="21" stroke="#a1a1aa" strokeWidth="1.4" strokeLinecap="round"
                    style={{ transformOrigin: "9px 16.5px" }}
                    animate={walking ? { rotate: [-25, 25, -25] } : undefined} transition={step}
                />
                <motion.line
                    x1="15" y1="16.5" x2="17.5" y2="21" stroke="#a1a1aa" strokeWidth="1.4" strokeLinecap="round"
                    style={{ transformOrigin: "15px 16.5px" }}
                    animate={walking ? { rotate: [25, -25, 25] } : undefined} transition={step}
                />
            </motion.g>
            {/* legs */}
            <motion.line
                x1="10.5" y1="22.5" x2="10.5" y2="31" stroke="#a1a1aa" strokeWidth="1.6" strokeLinecap="round"
                style={{ transformOrigin: "10.5px 22.5px" }}
                animate={walking ? { rotate: [28, -28, 28] } : undefined} transition={step}
            />
            <motion.line
                x1="13.5" y1="22.5" x2="13.5" y2="31" stroke="#a1a1aa" strokeWidth="1.6" strokeLinecap="round"
                style={{ transformOrigin: "13.5px 22.5px" }}
                animate={walking ? { rotate: [-28, 28, -28] } : undefined} transition={step}
            />
        </svg>
    )
}

export function Contact() {

    const [state, handleSubmit] = useForm("xbdrekop");

    // earth rises and the sun comes up as the visitor scrolls into this section
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] })
    const rise = useTransform(scrollYProgress, [0, 1], [220, 0])
    const sun = useTransform(scrollYProgress, [0.3, 1], [0, 1])
    const reduceMotion = useReducedMotion()

    return (
        <section ref={sectionRef} className="w-full pt-24 md:pt-32 pb-72 md:pb-80 relative overflow-hidden">

            {/* earth's horizon with atmosphere glow, sunrise sitting on its rim */}
            <motion.div aria-hidden style={{ y: rise }} className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-72">
                <motion.div
                    style={{ opacity: sun }}
                    className="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45),rgba(230,240,255,0.12)_35%,transparent_70%)] blur-xl"
                />
                <div className="absolute left-1/2 top-6 -translate-x-1/2 w-[320%] md:w-[200%] aspect-square rounded-full bg-[radial-gradient(circle_at_50%_0%,#1c1c22,#050507_18%,#000_40%)] shadow-[0_-1px_0_rgba(230,240,255,0.55),0_-20px_60px_rgba(230,240,255,0.22),0_-80px_180px_rgba(230,240,255,0.1)]">
                    {/* ring the size of the planet: rotating it walks the alien along the curved rim.
                        The planet is much wider on phones, so the visible arc is smaller there: walk ±15° instead of ±34°. */}
                    <div className="absolute inset-0 animate-[alien-walk_30s_linear_infinite] md:animate-[alien-walk_45s_linear_infinite] [--walk-from:-15deg] [--walk-to:15deg] md:[--walk-from:-34deg] md:[--walk-to:34deg] motion-reduce:animate-none motion-reduce:-rotate-6">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full">
                            <Alien walking={!reduceMotion} />
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* planet body fades to black so the footer joins seamlessly */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black to-transparent" />

            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Text & Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <p className="mb-4 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-500">
                            Chapter 06 · Home
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 leading-tight">
                            Your idea is next.<br />Let&apos;s bring it home.
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-lg mb-12">
                            Everything in orbit started as a message like yours. Tell me what you&apos;re building, or just say hi.
                        </p>

                        <div className="flex gap-6">
                            {SOCIALS.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    {...external(link.href)}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-neutral-400 hover:text-white transition-colors p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5 md:w-6 md:h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Ghost Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        {state.succeeded ? (
                            <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 rounded-lg border border-zinc-800 text-center">
                                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                                <p className="text-neutral-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg"
                                    />
                                    <ValidationError
                                        prefix="Name"
                                        field="name"
                                        errors={state.errors}
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg"
                                    />
                                    <ValidationError
                                        prefix="Email"
                                        field="email"
                                        errors={state.errors}
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg resize-none"
                                    />
                                    <ValidationError
                                        prefix="Message"
                                        field="message"
                                        errors={state.errors}
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Magnetic>
                                    <button
                                        type="submit"
                                        disabled={state.submitting}
                                        className="group flex items-center gap-2 text-white text-lg font-medium hover:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {state.submitting ? 'Sending...' : 'Send Message'}
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    </Magnetic>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

        </section>
    )
}
