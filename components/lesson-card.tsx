import Link from "next/link";
import type { Lesson, SectionSlug } from "../lib/training-catalog";

export function LessonCard({ lesson, section }: { lesson: Lesson; section: SectionSlug }) {
  const content = <>
    <div className="lesson-card-top"><span>Lesson</span><em>{lesson.duration} min</em></div>
    <h3>{lesson.title}</h3>
    <p>{lesson.description}</p>
    <div className="lesson-card-footer">
      <span>{lesson.status === "available" ? "Interactive lesson" : "Coming soon"}</span>
      <b>{lesson.status === "available" ? "Start lesson →" : "Coming soon"}</b>
    </div>
  </>;
  return lesson.status === "available"
    ? <Link className="lesson-card" href={`/training/${section}/${lesson.slug}`}>{content}</Link>
    : <div className="lesson-card planned">{content}</div>;
}
