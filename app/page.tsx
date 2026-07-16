import Link from "next/link";
import { LessonCard } from "../components/lesson-card";
import { SupportCta } from "../components/support-cta";
import { TrainingShell } from "../components/training-shell";
import { assetPath } from "../lib/asset-path";
import { availableLessons, sections, upcomingModules } from "../lib/training-catalog";

export default function TrainingHome() {
  const featuredLessons = availableLessons.filter(({ section, slug }) => [
    "maps:view-trips",
    "maps:request-trip-video",
    "safety:coach-driver",
    "safety:review-scorecards",
    "reports:schedule-report",
    "admin:users-permissions",
  ].includes(`${section.slug}:${slug}`));

  return <TrainingShell>
    <section className="academy-hero">
      <div className="academy-hero-copy">
        <span className="academy-kicker">Welcome to ZenCam Academy</span>
        <h1>Build confidence.<span>Drive better outcomes.</span></h1>
        <strong className="academy-subhead">Practical training for every part of your fleet operation.</strong>
        <p>Learn essential ZenCam workflows through clear, self-paced lessons using real product screens.</p>
      </div>
      <div className="academy-benefits" aria-label="Training benefits">
        <div><strong>Self-paced</strong><span>Learn on your schedule</span></div>
        <div><strong>Task-focused</strong><span>Practice everyday workflows</span></div>
        <div><strong>Safe by design</strong><span>No changes to fleet data</span></div>
      </div>
    </section>

    <section className="academy-sections">
      <div className="section-heading">
        <div><span>Training modules</span><h2>Choose a product area</h2></div>
        <p>Start with the area that matches what you need to accomplish.</p>
      </div>
      <div className="section-grid">
        {sections.map((section, index) => <Link key={section.slug} href={`/training/${section.slug}`} className={`section-card ${section.color}`}>
          <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="section-icon"><img src={assetPath(section.icon)} alt="" /></span>
          <div><h3>{section.title}</h3><p>{section.description}</p><small>{section.lessons.length} lessons</small></div>
          <b>&rarr;</b>
        </Link>)}
      </div>
    </section>

    <section className="ready-lessons">
      <div className="section-heading"><div><span>Recommended lessons</span><h2>Start with a popular task</h2></div><p>Focused lessons help you get comfortable in just a few minutes.</p></div>
      <div className="lesson-grid">{featuredLessons.map(({ section, ...lesson }) => <LessonCard key={`${section.slug}-${lesson.slug}`} section={section.slug} lesson={lesson} />)}</div>
    </section>

    <section className="academy-roadmap">
      <div className="section-heading"><div><span>More training on the way</span><h2>Expanding across ZenCam</h2></div></div>
      <div className="roadmap-grid">{upcomingModules.map((module) => <article className="roadmap-card" key={module.title}>
        <div><span>Coming soon</span><h3>{module.title}</h3></div>
        <p>{module.description}</p>
        <ul>{module.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
      </article>)}</div>
    </section>

    <SupportCta />
  </TrainingShell>;
}
