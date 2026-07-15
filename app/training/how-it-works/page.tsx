import { SupportCta } from "../../../components/support-cta";
import { TrainingShell } from "../../../components/training-shell";

const statusItems = [
  { status: "Driving", detail: "The vehicle is moving and reporting normally.", tone: "green" },
  { status: "Stopped", detail: "The vehicle is parked or the engine is off.", tone: "red" },
  { status: "Idle", detail: "The engine is running, but the vehicle is not moving.", tone: "amber" },
  { status: "Offline", detail: "No recent signal has been received. The vehicle may be off, out of coverage, or need attention.", tone: "gray" },
  { status: "Exception", detail: "A configured safety event or alert is ready to review.", tone: "orange" },
];

export default function HowItWorksPage() {
  return <TrainingShell activeResource="how-it-works">
    <section className="resource-hero">
      <span className="resource-hero-icon">▶</span>
      <div><span>Camera essentials</span><h1>How the ZenCam system works</h1><p>A practical overview of how video is recorded, retrieved, preserved, and used to support safer driving.</p></div>
    </section>

    <section className="resource-section">
      <div className="section-heading"><div><span>Video lifecycle</span><h2>From the vehicle to your video library</h2></div><p>The camera records locally first. You choose what needs to be preserved.</p></div>
      <div className="lifecycle-grid">
        <article><b>1</b><span>Record</span><h3>Footage is saved in the vehicle</h3><p>While the camera is powered, video records to its SD card or internal storage.</p></article>
        <article><b>2</b><span>Rolling window</span><h3>New footage replaces the oldest</h3><p>Local storage continuously overwrites older video. A typical retrieval window is about 24–72 hours, depending on camera settings, storage size, and vehicle activity.</p></article>
        <article><b>3</b><span>Request</span><h3>Select the moment you need</h3><p>Use a trip, the map, or the camera area to request a specific time range before it is overwritten.</p></article>
        <article><b>4</b><span>Preserve</span><h3>Requested clips move to the cloud</h3><p>Once uploaded and saved, a requested clip sits outside the SD card’s rolling window and remains in your library until it is deleted. Available cloud capacity depends on your plan.</p></article>
      </div>
      <aside className="resource-callout"><strong>Act quickly after an incident.</strong><span>If footage is still only on the camera, it cannot be recovered after the local recording has been overwritten.</span></aside>
    </section>

    <section className="resource-section">
      <div className="section-heading"><div><span>Choose the right view</span><h2>Three ways to work with video</h2></div></div>
      <div className="info-card-grid three">
        <article><span className="info-label live">Right now</span><h3>Live stream</h3><p>See what an online camera sees at this moment. Use it for an active situation, not past activity.</p></article>
        <article><span className="info-label preview">Verify</span><h3>Preview</h3><p>Confirm that you selected the right historical moment before saving or sharing a clip.</p></article>
        <article><span className="info-label saved">Preserve</span><h3>Requested video</h3><p>Save a focused clip for incident review, coaching, insurance, or sharing with an authorized recipient.</p></article>
      </div>
    </section>

    <section className="resource-section split-resource">
      <div>
        <div className="section-heading"><div><span>Driver support</span><h2>Coaching can happen in real time</h2></div></div>
        <div className="resource-copy-card">
          <p>Depending on your camera model and configuration, ZenCam can give drivers immediate in-cab audio alerts for behaviors such as distraction, following too closely, harsh events, or speeding.</p>
          <ul><li>Alerts help the driver correct behavior while it is happening.</li><li>Managers can review paired video before following up.</li><li>Supported cameras can provide hands-free calling and customized spoken messages.</li><li>Available behaviors and coaching options depend on your installed equipment and settings.</li></ul>
        </div>
      </div>
      <div>
        <div className="section-heading"><div><span>Fleet at a glance</span><h2>Understand vehicle status</h2></div></div>
        <div className="status-list">{statusItems.map((item) => <article key={item.status}><i className={item.tone} /><div><strong>{item.status}</strong><p>{item.detail}</p></div></article>)}</div>
      </div>
    </section>

    <SupportCta compact />
  </TrainingShell>;
}
