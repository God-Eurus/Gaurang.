// Portfolio projects, shared by the projects section and the stats in the mission brief
export interface Project {
    title: string
    description: string
    tags: string[]
    link: string
    image: string
}

export const projects: Project[] = [
      {
    title: "AKFD Studio",
    description: "Custom Shopify theme for a premium furniture and design brand, focused on craftsmanship, editorial storytelling, and a refined shopping experience.",
    tags: ["Shopify", "Liquid", "Custom Theme"],
    link: "https://akfdstudio.com",
    image: "/akfd.png",
},
{
        title: "The Craftings",
        description: "A digital showcase for bespoke design and creative assets. Features a minimalist gallery and interactive portfolio elements.",
        tags: ["Next.js", "Framer Motion", "GSAP"],
        link: "https://thecraftings.com",
        image: "/craftings.png",
    },

{
    title: "Curiocty Box",
    description: "Custom Shopify theme for a books, stationery, and gifts store featuring curated collections, category-driven navigation, and a modern retail experience.",
    tags: ["Shopify", "Liquid", "Custom Theme"],
    link: "https://curioctybox.com",
    image: "/curiocty.png",
},
    
    {
        title: "Maison No. 3",
        description: "A digital presence for a forward-thinking creative marketing agency. Features a minimalist, luxury aesthetic and elegant animations to showcase premium campaigns.",
        tags: ["Next.js", "GSAP", "Tailwind CSS"],
        link: "https://www.maisonnoiii.com/",
        image: "/maison.png",
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
        image: "/treasure.png",
    }
]

// every distinct technology used across the projects
// (skip non-tech labels, merge spelling variants)
const ALIAS: Record<string, string> = { Tailwind: "Tailwind CSS" }
export const stack = Array.from(new Set(
    projects.flatMap((p) => p.tags).filter((t) => t !== "Custom Theme").map((t) => ALIAS[t] ?? t),
))
