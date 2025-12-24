'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
    ]

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted:', formState)
    }

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 bg-black relative overflow-hidden" id="contact">
            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Text & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 leading-tight">
                            Let's work<br />together
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-lg mb-12">
                            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and interesting ideas.
                        </p>

                        <div className="flex gap-6">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
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
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors text-lg resize-none"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="group flex items-center gap-2 text-white text-lg font-medium hover:text-zinc-300 transition-colors"
                                >
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
        </section>
    )
}
