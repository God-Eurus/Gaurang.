'use client'

import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"; // Requires: npm install framer-motion
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Requires: npm install lucide-react

export function Hero() {
    return (
        <section className="w-full h-screen min-h-[800px] bg-black/[0.96] relative overflow-hidden flex items-center">
            {/* Spotlight for dramatic lighting */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="container mx-auto px-4 md:px-8 flex flex-col-reverse md:flex-row h-full items-center">

                {/* Left Content: Text & CTA */}
                <div className="flex-1 py-12 md:py-0 relative z-20 flex flex-col justify-center gap-6">

                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-fit px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs uppercase tracking-widest font-medium"
                    >
                        Based in India
                    </motion.div>

                    {/* Headline: Punchier and bolder */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Designing
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/60 to-white/20">
                            The Future.
                        </span>
                    </motion.h1>

                    {/* Subtext: More professional tone */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-zinc-400 max-w-lg text-lg md:text-xl leading-relaxed"
                    >
                        I'm <span className="text-white font-medium">Gaurang</span>, a Full Stack Developer blending code and creativity to build immersive web experiences.
                    </motion.p>

                    {/* Call to Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4 mt-4"
                    >
                        <Link
                            href="#projects"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <span className="mr-2">View My Work</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="#contact"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/50 px-8 font-medium text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                </div>

                {/* Right Content: 3D Scene */}
                {/* Added 'pointer-events-none' to preventing Spline from blocking text clicks if it overlaps, 
                    unless the Spline scene is interactive (then remove it). */}
                <div className="flex-1 w-full h-[500px] md:h-full relative z-10">
                    {/* Gradient overlay to blend the 3D scene into the background at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/[0.96] to-transparent z-20 pointer-events-none" />

                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    )
}