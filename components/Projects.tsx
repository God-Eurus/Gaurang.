'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import Link from 'next/link'

interface Project {
    title: string
    description: string
    tags: string[]
    link: string
    image: string
}

const projects: Project[] = [
    {
        title: "The Craftings",
        description: "A digital showcase for bespoke design and creative assets. Features a minimalist gallery and interactive portfolio elements.",
        tags: ["Next.js", "Framer Motion", "GSAP"],
        link: "https://thecraftings.com", // Replace with actual link
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&auto=format&fit=crop", // Abstract/Creative vibe

    },
    {
        title: "Razlot",

        description: "Scalable web application architecture deployed on AWS. Focuses on high-performance delivery and seamless user management.",
        tags: ["Next.js", "AWS Amplify", "Tailwind CSS"],
        link: "https://razlot.com",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop", // Tech/Network vibe

    },
    {
        title: "MediVoyage",

        description: "Medical tourism platform featuring a teleconsultation portal for international patients. Designed for trust and accessibility.",
        tags: ["React", "WebRTC", "Tailwind"],
        link: "https://mymedivoyage.com",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop", // Medical/Clean vibe

    },
    {
        title: "Treasure Residences",

        description: "Luxury property showcase featuring a dark maroon aesthetic, immersive galleries, and premium service listings.",
        tags: ["Next.js", "GSAP", "Radix UI"],
        link: "https://katewacompanies.in",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop", // Luxury Interior

    }
]

export function Projects() {
    return (
        <section className="w-full py-12 md:py-24 bg-black relative z-10">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 border-b border-zinc-800 pb-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        SELECTED WORKS
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={project.link} target="_blank" className="block h-full outline-none cursor-pointer">
                                <Card className="group h-full bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-none overflow-hidden transition-all duration-300">

                                    {/* Image Section */}
                                    <div className="relative h-64 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800 group-hover:border-zinc-600 transition-colors">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />
                                        {/* Subtle overlay to blend image into dark theme */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex flex-col justify-between h-[calc(100%-16rem)] p-6">
                                        <div>
                                            <CardHeader className="p-0 mb-4 space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                                                        {project.title}
                                                    </CardTitle>
                                                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
                                                </div>
                                                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                                                    {project.description}
                                                </p>
                                            </CardHeader>
                                        </div>

                                        <CardContent className="p-0 mt-6">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-zinc-500 border border-zinc-800 bg-zinc-900/50 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}