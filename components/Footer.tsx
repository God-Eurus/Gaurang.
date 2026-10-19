import { ArrowUp } from "lucide-react";
import { SOCIALS, external } from "@/lib/socials";
import { SpaceStation } from "@/components/ui/space-station";
import { SaberBattle } from "@/components/ui/saber-battle";
import { CHAPTERS } from "@/lib/chapters";


// Mission control: closes the story under the planet's horizon.
export function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-black pt-16 md:pt-20 pb-8">
            {/* faint glow carried over from the sunrise above */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(230,240,255,0.07),transparent)]" />

            <SpaceStation className="absolute -right-20 top-10 w-56 opacity-25 sm:-right-10 sm:w-72 lg:w-96 lg:top-4" />
            {/* the duel roams the whole footer, behind the text so links stay clickable */}
            <SaberBattle className="absolute inset-0" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
                    <div className="col-span-2 lg:col-span-1">
                        <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 animate-ping motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                            </span>
                            Available for new missions
                        </p>
                        <p className="mt-5 max-w-sm text-zinc-400 leading-relaxed">
                            Crafting digital experiences with code and creativity, from Jaipur to anywhere in orbit.
                        </p>
                    </div>

                    <nav aria-label="Footer">
                        <p className="mb-5 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-600">Flight path</p>
                        <ul className="space-y-3">
                            {CHAPTERS.map((c) => (
                                <li key={c.id}>
                                    <a href={`#${c.id}`} className="group inline-flex items-baseline gap-3 text-zinc-400 hover:text-white transition-colors">
                                        <span className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400">{c.n}</span>
                                        {c.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="mb-5 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-600">Transmit</p>
                        <ul className="space-y-3">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <li key={label}>
                                    <a href={href} {...external(href)} className="group inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                                        <span className="grid place-items-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                            <Icon className="w-3.5 h-3.5" />
                                        </span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* giant fading wordmark */}
                <div className="relative mt-16 md:mt-20">
                <p aria-hidden className="select-none text-center font-bold uppercase tracking-tighter leading-[0.8] text-[19vw] md:text-[17vw] xl:text-[14rem] bg-clip-text text-transparent bg-linear-to-b from-white/20 to-white/0">
                    Gaurang
                </p>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-900 flex flex-col-reverse sm:flex-row gap-4 justify-between items-center text-xs text-zinc-600">
                    <p>© {new Date().getFullYear()} Gaurang · The end, for now.</p>
                    <a href="#top" className="group inline-flex items-center gap-2 uppercase tracking-[0.3em] text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">
                        Back to launch
                        <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
