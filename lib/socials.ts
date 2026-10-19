import { Github, Instagram, Linkedin, Mail } from "lucide-react"

// social links, shared by the contact section and the footer
export const SOCIALS = [
    { icon: Mail, href: "mailto:Maharwal.g@gmail.com", label: "Email" },
    { icon: Github, href: "https://github.com/God-Eurus", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/gaurang-maharwal-614179201", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/gaurang_1606/", label: "Instagram" },
]

// external profiles open in a new tab; mailto stays in place
export const external = (href: string) => href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}
