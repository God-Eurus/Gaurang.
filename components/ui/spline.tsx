'use client'

import { Suspense, lazy } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
    onLoad?: (app: Application) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500 animate-pulse">Booting robot…</span>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
                onLoad={onLoad}
            />
        </Suspense>
    )
}
