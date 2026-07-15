import { notFound } from "next/navigation";
import { LessonCard } from "../../../components/lesson-card";
import { TrainingShell } from "../../../components/training-shell";
import { assetPath } from "../../../lib/asset-path";
import { getSection, sections } from "../../../lib/training-catalog";

export function generateStaticParams() { return sections.map((section) => ({ section: section.slug })); }

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: sectionSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) notFound();
  const available = section.lessons.filter((lesson) => lesson.status === "available").length;
  return <TrainingShell activeSection={section.slug}>
    <section className={`section-hero ${section.color}`}>
      <span className="section-hero-icon"><img src={assetPath(section.icon)} alt="" /></span>
      <div><span>ZenCam Academy / {section.title}</span><h1>{section.title} training</h1><p>{section.description}</p><small>{available} {available === 1 ? "lesson" : "lessons"}</small></div>
    </section>
    <section className="curriculum">
      <div className="section-heading"><div><span>{section.title} module</span><h2>Choose a lesson</h2></div><p>Each lesson focuses on a task you’ll perform in ZenduONE.</p></div>
      <div className="lesson-grid">{section.lessons.map((lesson) => <LessonCard key={lesson.slug} section={section.slug} lesson={lesson} />)}</div>
    </section>
  </TrainingShell>;
}
