import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react"; // Assuming you use Lucide or similar

export function Footer() {
    const links = [
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const socials = [
        { icon: <Twitter size={20} />, href: "#" },
        { icon: <Github size={20} />, href: "#" },
        { icon: <Linkedin size={20} />, href: "#" },
    ];

    return (
        <footer className="w-full bg-black border-t border-zinc-800 pt-12 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Column 1: Brand & Call to Action */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Gaurang.</h2>
                        <p className="text-zinc-400 max-w-sm">
                            Crafting digital experiences with code and creativity.
                            Open for collaborations.
                        </p>
                    </div>

                    {/* Column 2: Navigation & Socials */}
                    <div className="flex flex-col md:items-end justify-between gap-6">
                        {/* Nav Links */}
                        <div className="flex gap-6">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socials.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
                    <p>© {new Date().getFullYear()} Gaurang.</p>
                    <p>Designed & Developed in India.</p>
                </div>
            </div>
        </footer>
    );
}