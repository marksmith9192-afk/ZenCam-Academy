import Link from "next/link";
import { assetPath } from "../lib/asset-path";
import { sections, type SectionSlug } from "../lib/training-catalog";

type ResourceSlug = "how-it-works" | "camera-health";

const resources: Array<{ slug: ResourceSlug; title: string; icon: string }> = [
  { slug: "how-it-works", title: "How It Works", icon: "▶" },
  { slug: "camera-health", title: "Camera Health", icon: "✓" },
];

export function TrainingShell({ children, activeSection, activeResource }: { children: React.ReactNode; activeSection?: SectionSlug; activeResource?: ResourceSlug }) {
  return (
    <div className="training-app">
      <aside className="training-nav" aria-label="Training sections">
        <Link href="/" className={!activeSection && !activeResource ? "training-nav-home active" : "training-nav-home"}>
          <img className="training-home-logo" src={assetPath("/traxxis-t-logo.png")} alt="" />
          <span>Training Home</span>
        </Link>
        <p>Camera essentials</p>
        {resources.map((resource) => (
          <Link key={resource.slug} href={`/training/${resource.slug}`} className={activeResource === resource.slug ? "active" : ""}>
            <span className="nav-icon resource">{resource.icon}</span>
            <span>{resource.title}</span>
          </Link>
        ))}
        <p>Learn by area</p>
        {sections.map((section) => (
          <Link key={section.slug} href={`/training/${section.slug}`} className={activeSection === section.slug ? "active" : ""}>
            <span className={`nav-icon ${section.color}`}><img src={assetPath(section.icon)} alt="" /></span>
            <span>{section.title}</span>
            <em>{section.lessons.filter((lesson) => lesson.status === "available").length}</em>
          </Link>
        ))}
        <div className="training-nav-note"><strong>Practice safely</strong><span>Lessons use real product screens and never change your fleet data.</span></div>
      </aside>
      <main className="training-main">{children}</main>
    </div>
  );
}
