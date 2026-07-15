import Link from "next/link";
import { assetPath } from "../lib/asset-path";
import { sections, type SectionSlug } from "../lib/training-catalog";

export function TrainingShell({ children, activeSection }: { children: React.ReactNode; activeSection?: SectionSlug }) {
  return (
    <div className="training-app">
      <aside className="training-nav" aria-label="Training sections">
        <Link href="/" className={!activeSection ? "training-nav-home active" : "training-nav-home"}>
          <img className="training-home-logo" src={assetPath("/traxxis-t-logo.png")} alt="" />
          <span>Training Home</span>
        </Link>
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
