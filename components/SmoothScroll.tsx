'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Inertial smooth scrolling for mouse/trackpad (touch keeps native scrolling),
// plus smooth jumps for every in-page "#section" link on the site.
export function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })

        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null
            if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
            const hash = a.getAttribute('href')!
            if (hash.length < 2) return
            const target = hash === '#top' ? 0 : document.querySelector(hash)
            if (target === null) return
            e.preventDefault()
            // offset clears the fixed header
            lenis.scrollTo(target as HTMLElement | number, { offset: hash === '#top' ? 0 : -80, duration: 1.4 })
            history.replaceState(null, '', hash)
        }
        document.addEventListener('click', onClick)
        return () => { document.removeEventListener('click', onClick); lenis.destroy() }
    }, [])

    return null
}
