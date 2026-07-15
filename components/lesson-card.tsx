import Link from "next/link";
import type { Lesson, SectionSlug } from "../lib/training-catalog";

export function LessonCard({ lesson, section }: { lesson: Lesson; section: SectionSlug }) {
  const content = <>
    <div className="lesson-card-top"><span>{lesson.level}</span><em>{lesson.duration} min</em></div>
    <h3>{lesson.title}</h3>
    <p>{lesson.description}</p>
    <div className="lesson-card-footer">
      <span>{lesson.status === "available" ? "Recorded walkthrough" : "Planned lesson"}</span>
      <b>{lesson.status === "available" ? "Start →" : "Coming soon"}</b>
    </div>
  </>;
  return lesson.status === "available"
    ? <Link className="lesson-card" href={`/training/${section}/${lesson.slug}`}>{content}</Link>
    : <div className="lesson-card planned">{content}</div>;
}
