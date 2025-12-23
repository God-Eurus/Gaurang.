'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

export function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smooth scroll handler function
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for the fixed header height (approx 80px)
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

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
                <Link
                    href="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xl font-bold text-white tracking-tighter hover:opacity-80 transition-opacity"
                >
                    Gaurang.
                </Link>

                <nav className="flex items-center gap-6 md:gap-8">
                    {/* Navigation Link */}
                    <a
                        href="#projects"
                        onClick={(e) => scrollToSection(e, 'projects')}
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                        Projects
                    </a>

                    {/* Primary CTA Button */}
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, 'contact')}
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