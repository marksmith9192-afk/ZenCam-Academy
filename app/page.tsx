import Link from "next/link";
import { LessonCard } from "../components/lesson-card";
import { TrainingShell } from "../components/training-shell";
import { assetPath } from "../lib/asset-path";
import { availableLessons, sections } from "../lib/training-catalog";

export default function TrainingHome() {
  return <TrainingShell>
    <section className="academy-hero">
      <div className="academy-hero-copy">
        <span className="academy-kicker">Welcome to ZenduONE Academy</span>
        <h1>Learn the work.<span>Then do it.</span></h1>
        <strong className="academy-subhead">Real workflows. Safe practice. Confident teams.</strong>
        <p>Short, recorded lessons built around the workflows your fleet team uses every day.</p>
      </div>
      <div className="academy-progress">
        <span>Foundation library</span>
        <strong>{availableLessons.length} recorded lessons ready</strong>
        <div><i /></div>
        <small>Maps, Safety, Reports, and Admin are available now</small>
      </div>
    </section>

    <section className="academy-sections">
      <div className="section-heading">
        <div><span>Browse training</span><h2>Choose a product area</h2></div>
        <p>Each area grows into a complete role-based curriculum.</p>
      </div>
      <div className="section-grid">
        {sections.map((section, index) => <Link key={section.slug} href={`/training/${section.slug}`} className={`section-card ${section.color}`}>
          <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="section-icon"><img src={assetPath(section.icon)} alt="" /></span>
          <div><h3>{section.title}</h3><p>{section.description}</p><small>{section.lessons.length} workflows</small></div>
          <b>&rarr;</b>
        </Link>)}
      </div>
    </section>

    <section className="ready-lessons">
      <div className="section-heading"><div><span>Available now</span><h2>Start a recorded walkthrough</h2></div></div>
      <div className="lesson-grid">{availableLessons.map(({ section, ...lesson }) => <LessonCard key={`${section.slug}-${lesson.slug}`} section={section.slug} lesson={lesson} />)}</div>
    </section>
  </TrainingShell>;
}
