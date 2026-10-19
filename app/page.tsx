import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { MissionBrief } from "@/components/MissionBrief";
import { Payload } from "@/components/Payload";
import { FlightPlan } from "@/components/FlightPlan";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoryRail } from "@/components/StoryRail";
import { ChapterGate } from "@/components/ChapterGate";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <StoryRail />
      <Hero />
      <ChapterGate n="02" label="Ascent" line="Leaving the atmosphere." />
      <div id="brief">
        <MissionBrief />
      </div>
      <ChapterGate n="03" label="Payload" line="Checking what we brought along." />
      <div id="payload">
        <Payload />
      </div>
      <ChapterGate n="04" label="Orbit" line="Entering orbit. The work comes into view." />
      <div id="projects">
        <Projects />
      </div>
      <ChapterGate n="05" label="Flight plan" line="Every mission follows a plan." />
      <div id="process">
        <FlightPlan />
      </div>
      <ChapterGate n="06" label="Home" line="Beginning re-entry." />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

