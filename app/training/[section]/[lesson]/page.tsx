import Link from "next/link";
import { notFound } from "next/navigation";
import { ScreenshotWorkflowDemo } from "../../../../components/screenshot-workflow-demo";
import { TrainingShell } from "../../../../components/training-shell";
import { getLesson, sections } from "../../../../lib/training-catalog";

export function generateStaticParams() {
  return sections.flatMap((section) => section.lessons
    .filter((lesson) => lesson.status === "available" && lesson.demo)
    .map((lesson) => ({ section: section.slug, lesson: lesson.slug })));
}

export default async function LessonPage({ params }: { params: Promise<{ section: string; lesson: string }> }) {
  const { section: sectionSlug, lesson: lessonSlug } = await params;
  const result = getLesson(sectionSlug, lessonSlug);
  if (!result || result.lesson.status !== "available" || !result.lesson.demo) notFound();
  const { section, lesson } = result;
  const demo = lesson.demo;
  if (!demo) notFound();
  const availableLessons = section.lessons.filter((item) => item.status === "available" && item.demo);
  const lessonIndex = availableLessons.findIndex((item) => item.slug === lesson.slug);
  const nextLesson = availableLessons[lessonIndex + 1];
  return <TrainingShell activeSection={section.slug}>
    <div className="lesson-breadcrumb"><Link href="/">Training</Link><span>›</span><Link href={`/training/${section.slug}`}>{section.title}</Link><span>›</span><strong>{lesson.title}</strong></div>
    <section className="lesson-heading"><div><span className="academy-kicker">ZenCam lesson · {lesson.duration} minutes</span><h1>{lesson.title}</h1><p>{lesson.description}</p></div><aside><strong>What you’ll learn</strong><ol>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ol></aside></section>
    <ScreenshotWorkflowDemo
      variant={demo}
      moduleLink={{ href: `/training/${section.slug}`, label: `${section.title} training` }}
      nextLesson={nextLesson ? { href: `/training/${section.slug}/${nextLesson.slug}`, label: nextLesson.title } : undefined}
    />
    <div className="lesson-next"><span>Use the highlighted areas to practice each step. Nothing in this lesson changes your fleet data.</span><Link href={`/training/${section.slug}`}>Back to {section.title} training</Link></div>
  </TrainingShell>;
}
