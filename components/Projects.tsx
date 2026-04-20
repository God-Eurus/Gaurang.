'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

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
        link: "https://thecraftings.com",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&auto=format&fit=crop",
    },
    {
        title: "Maison NO. 3",
        description: "A digital presence for a forward-thinking creative marketing agency. Features a minimalist, luxury aesthetic and elegant animations to showcase premium campaigns.",
        tags: ["Next.js", "GSAP", "Tailwind CSS"],
        link: "https://www.maisonnoiii.com/",
        image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Razlot",
        description: "Scalable web application architecture deployed on AWS. Focuses on high-performance delivery and seamless user management.",
        tags: ["Next.js", "AWS Amplify", "Tailwind CSS"],
        link: "https://razlot.com",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop",
    },
    {
        title: "MediVoyage",
        description: "Medical tourism platform featuring a teleconsultation portal for international patients. Designed for trust and accessibility.",
        tags: ["React", "WebRTC", "Tailwind"],
        link: "https://mymedivoyage.com",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "Treasure Residences",
        description: "Luxury property showcase featuring a dark maroon aesthetic, immersive galleries, and premium service listings.",
        tags: ["Next.js", "GSAP", "Radix UI"],
        link: "https://katewacompanies.in",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    }
]

// Custom component for the staggered word reveal
const AnimatedText = ({ text }: { text: string }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.2 * i }, 
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: { opacity: 0, y: 15 },
    };

    return (
        <motion.p
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md flex flex-wrap"
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="mr-1.5 mb-1">
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
};

export function Projects() {
    return (
        <section className="w-full py-16 md:py-24 bg-black relative z-10 selection:bg-zinc-800 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">
                        Selected Works
                    </h2>
                    <p className="text-zinc-500 max-w-sm text-xs md:text-sm font-medium uppercase tracking-widest">
                        A curated collection of digital experiences.
                    </p>
                </motion.div>

                {/* Alternating List Section */}
                <div className="flex flex-col border-t border-zinc-800">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`group relative flex flex-col md:flex-row border-b border-zinc-800 transition-colors duration-500 hover:bg-zinc-900/20 ${
                                    !isEven ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Animated Center Border Line */}
                                <motion.div 
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                                    viewport={{ once: true }}
                                    className={`hidden md:block absolute top-0 bottom-0 w-[1px] bg-zinc-800 z-0 ${
                                        isEven ? 'left-1/2' : 'right-1/2'
                                    }`}
                                />

                                {/* Image Container */}
                                <div className="relative w-full md:w-1/2 h-[300px] md:h-[450px] overflow-hidden z-10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    {/* Curtain Reveal Overlay */}
                                    <motion.div
                                        initial={{ height: "100%" }}
                                        whileInView={{ height: "0%" }}
                                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="absolute inset-x-0 bottom-0 bg-black z-20"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                </div>

                                {/* Content Container */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative overflow-hidden z-10">
                                    <Link href={project.link} target="_blank" className="absolute inset-0 z-20">
                                        <span className="sr-only">View {project.title}</span>
                                    </Link>

                                    {/* Animated Title */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="overflow-hidden pb-1">
                                            <motion.h3 
                                                initial={{ y: "100%" }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                                viewport={{ once: true }}
                                                className="text-2xl md:text-4xl font-bold text-white tracking-tight uppercase"
                                            >
                                                {project.title}
                                            </motion.h3>
                                        </div>
                                        <div className="p-2.5 border border-zinc-800 bg-black text-zinc-400 group-hover:text-white group-hover:border-white transition-all duration-300 rounded-none transform group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Staggered Word Reveal Description */}
                                    <AnimatedText text={project.description} />
                                    
                                    {/* Staggered Tags */}
                                    <motion.div 
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                                            }
                                        }}
                                        className="flex flex-wrap gap-2 mt-auto relative z-30 pointer-events-none"
                                    >
                                        {project.tags.map((tag, tagIndex) => (
                                            <motion.span
                                                key={tagIndex}
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                                                }}
                                                className="px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-widest font-mono text-zinc-400 border border-zinc-800 bg-black rounded-none group-hover:border-zinc-500 transition-colors duration-300"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}