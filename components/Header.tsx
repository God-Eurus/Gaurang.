'use client'

import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

export function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                scrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <a
                    href="#top"
                    className="text-xl font-bold text-white tracking-tighter hover:opacity-80 transition-opacity"
                >
                    Gaurang.
                </a>

                <nav className="flex items-center gap-4 md:gap-8">
                    {/* Navigation Link */}
                    <a
                        href="#projects"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                        Projects
                    </a>

                    {/* Primary CTA Button */}
                    <a
                        href="#contact"
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            "bg-white text-black hover:bg-zinc-200", // Light Mode style
                            // Optional: If you want a outlined style instead, swap for:
                            // "border border-white/20 text-white hover:bg-white hover:text-black"
                        )}
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    )
}