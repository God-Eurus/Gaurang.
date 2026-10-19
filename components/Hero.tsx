'use client'

import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight"
import { Starfield } from "@/components/ui/starfield"
import { Magnetic } from "@/components/ui/magnetic"
import { useEffect, useState } from "react";
import { ArrowRight, Bot } from "lucide-react"; // Requires: npm install lucide-react

// The Spline robot is several MB: skip it on phones and tablets, and on desktops
// load it only after the page is idle so text and stars paint first.
function useDeferredRobot() {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (!window.matchMedia("(min-width: 1024px)").matches) return
        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
        const cancel = window.cancelIdleCallback ?? window.clearTimeout
        const id = idle(() => setShow(true), { timeout: 2500 })
        return () => cancel(id)
    }, [])
    return show
}

// the Spline camera scales with its canvas; these keep the whole robot in frame
const ROBOT_DESKTOP_ZOOM = 0.7
const ROBOT_MOBILE_ZOOM = 0.5 // the scene clamps zoom at about 0.5; on phones the canvas height does the rest

export function Hero() {
    const autoRobot = useDeferredRobot()
    // phones/tablets: the 3D scene only downloads when the visitor asks for it
    const [woken, setWoken] = useState(false)
    // hidden until the scene has loaded and been zoomed, so it never flashes at the wrong size
    const [robotReady, setRobotReady] = useState(false)
    const showRobot = autoRobot || woken
    return (
        <section id="top" className="w-full min-h-[100dvh] lg:h-screen lg:min-h-[760px] bg-black/[0.96] relative overflow-hidden flex flex-col lg:flex-row items-center justify-center">
            {/* warp starfield: accelerates as the hero scrolls away, launching into chapter 02 */}
            <div className="absolute inset-0 z-0">
                <Starfield speed={0.25} count={900} scrollBoost />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Spotlight for dramatic lighting */}
            <Spotlight
                className="-top-40 left-0 md:left-40 lg:left-60 md:-top-20"
                fill="white"
            />

            <div className="container mx-auto px-5 sm:px-8 flex flex-col lg:flex-row h-full items-center justify-center lg:justify-between pt-28 pb-32 lg:py-0">

                {/* Left Content: Text & CTA */}
                <div className="flex-1 w-full max-w-2xl lg:max-w-[48%] relative z-20 flex flex-col justify-center gap-5 sm:gap-6">

                    {/* Animated Badge */}
                    <div
                        className="animate-fade-up [animation-delay:0ms] w-fit px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs uppercase tracking-widest font-medium"
                    >
                        Chapter 01 · Launch
                    </div>

                    {/* Headline: Punchier and bolder */}
                    <h1
                        className="animate-fade-up [animation-delay:100ms] text-[clamp(2.75rem,11vw,6rem)] leading-[0.95] font-bold tracking-tighter"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Designing
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/60 to-white/20">
                            The Future.
                        </span>
                    </h1>

                    {/* Subtext: More professional tone */}
                    <p
                        className="animate-fade-up [animation-delay:200ms] text-zinc-400 max-w-lg text-base sm:text-lg md:text-xl leading-relaxed"
                    >
                        I&apos;m <span className="text-white font-medium">Gaurang</span>, a Product Engineer from Jaipur building SaaS products, websites and e-commerce platforms for startups and brands.
                    </p>

                    {/* Call to Action Buttons */}
                    <div
                        className="animate-fade-up [animation-delay:300ms] flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4"
                    >
                        <Magnetic>
                        <a
                            href="#projects"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <span className="mr-2">View My Work</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        </Magnetic>

                        <Magnetic>
                        <a
                            href="#contact"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/50 px-8 font-medium text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
                        >
                            Contact Me
                        </a>
                        </Magnetic>
                    </div>

                    {!woken && (
                        <button
                            type="button"
                            onClick={() => setWoken(true)}
                            className="lg:hidden animate-fade-up [animation-delay:400ms] w-fit inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                        >
                            <Bot className="w-4 h-4" />
                            Wake the robot
                            <span className="text-zinc-600 normal-case tracking-normal">· 3D, ~1 MB</span>
                        </button>
                    )}
                </div>

                {/* Right Content: 3D Scene */}
                {/* Added 'pointer-events-none' to preventing Spline from blocking text clicks if it overlaps, 
                    unless the Spline scene is interactive (then remove it). */}
                {/* desktop: the canvas is pinned to the screen's right edge, full hero height and wider than the
                    column, so the robot's raised arms aren't clipped by a box; its left edge fades instead of cutting */}
                <div className={`${woken ? "block h-[54vh] flex-none -mt-2 -mx-5 sm:-mx-8 w-[calc(100%+2.5rem)] sm:w-[calc(100%+4rem)]" : "hidden w-full"} relative z-10 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_80%,transparent)] lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:mx-0 lg:w-[64vw] lg:h-auto lg:mt-0 lg:[mask-image:linear-gradient(to_right,transparent,black_22%)]`}>
                    {/* Gradient overlay to blend the 3D scene into the background at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/[0.96] to-transparent z-20 pointer-events-none" />

                    {showRobot && !robotReady && (
                        <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500 animate-pulse">Booting robot…</span>
                    )}
                    {showRobot && (
                        <div className="w-full h-full transition-opacity duration-1000" style={{ opacity: robotReady ? 1 : 0 }}>
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                                onLoad={(app) => { app.setZoom(window.innerWidth >= 1024 ? ROBOT_DESKTOP_ZOOM : ROBOT_MOBILE_ZOOM); setRobotReady(true) }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* scroll cue: leads into chapter 02 */}
            <a
                href="#brief"
                className={`${woken ? "hidden lg:flex" : "flex"} animate-fade-in [animation-delay:1.2s] absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-zinc-500 hover:text-white transition-colors`}
            >
                Scroll to launch
                <span className="relative block h-12 w-px overflow-hidden bg-zinc-800">
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white animate-scroll-line motion-reduce:animate-none" />
                </span>
            </a>
        </section>
    )
}