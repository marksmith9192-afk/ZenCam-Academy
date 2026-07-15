import { SupportCta } from "../../../components/support-cta";
import { TrainingShell } from "../../../components/training-shell";

const healthChecks = [
  { number: "01", title: "Confirm the vehicle was in use", body: "Check whether the vehicle was driven and the ignition was on. A parked vehicle may correctly appear offline or inactive." },
  { number: "02", title: "Look for power at the camera", body: "With the ignition on, check whether the camera starts and its indicator lights appear. No lights usually points to a power or connection issue." },
  { number: "03", title: "Note the indicator lights", body: "Power, network, GPS, and recording indicators vary by camera model. Record which lights are on, off, or flashing instead of guessing from color alone." },
  { number: "04", title: "Check ZenCam before touching hardware", body: "Review the unit’s last activity, online status, and recording health. A powered camera that is not reporting may be in a low-signal area or need support." },
];

export default function CameraHealthPage() {
  return <TrainingShell activeResource="camera-health">
    <section className="resource-hero health">
      <span className="resource-hero-icon">✓</span>
      <div><span>Camera essentials</span><h1>Troubleshooting and camera health</h1><p>Simple, safe checks to help you identify power, connectivity, and recording issues—and know when to contact Traxxis.</p></div>
    </section>

    <section className="resource-section">
      <div className="section-heading"><div><span>Start here</span><h2>Four checks before you call</h2></div><p>You do not need to be a technician to collect useful information.</p></div>
      <div className="health-check-grid">{healthChecks.map((check) => <article key={check.number}><span>{check.number}</span><h3>{check.title}</h3><p>{check.body}</p></article>)}</div>
      <aside className="resource-callout caution"><strong>Do not remove or format the SD card unless Traxxis directs you.</strong><span>That can erase footage or make the original issue harder to diagnose.</span></aside>
    </section>

    <section className="resource-section split-resource health-split">
      <div>
        <div className="section-heading"><div><span>What the lights can tell you</span><h2>Power versus connectivity</h2></div></div>
        <div className="signal-panel">
          <article><span className="signal off" /><div><h3>No lights with ignition on</h3><p>The camera may not be receiving power. Note the vehicle, time, and whether other installed equipment is working.</p></div></article>
          <article><span className="signal powered" /><div><h3>Power light is on, but the unit is offline</h3><p>The camera may be powered but unable to connect. Cellular coverage, antennas, or device communication may need review.</p></div></article>
          <article><span className="signal recording" /><div><h3>Online, but recording health is missing</h3><p>Check the camera page for Recording Health, Last Recording, or a media error. This can point to an SD card or recording issue.</p></div></article>
        </div>
        <p className="resource-footnote">Indicator names and colors differ by model. For example, ZenCam Plus uses separate indicators for power, GPS, network, Wi-Fi, alarms, and recording. Share the exact light pattern with Traxxis Support.</p>
      </div>
      <div>
        <div className="section-heading"><div><span>Use the platform</span><h2>Spot issues before drivers need footage</h2></div></div>
        <div className="resource-copy-card healthy-habits">
          <h3>A simple weekly camera-health routine</h3>
          <ul><li>On Maps or Assets, filter for vehicles that are offline or have not reported recently.</li><li>Compare the list with vehicles you know were driven.</li><li>Open the camera area and check Recording Health and Last Recording.</li><li>Watch for gaps in trip history or unexpected offline periods.</li><li>Review configured media-error, power-failure, or offline alerts.</li><li>Resolve health issues promptly so footage is available when an incident occurs.</li></ul>
        </div>
      </div>
    </section>

    <section className="resource-section escalation-section">
      <div className="section-heading"><div><span>Escalation</span><h2>What to send Traxxis Support</h2></div></div>
      <div className="escalation-grid"><span>Vehicle or asset name</span><span>Camera or device ID, if available</span><span>When it last reported</span><span>Whether the vehicle was driven</span><span>Lights that are on or flashing</span><span>A screenshot of the status or error</span></div>
    </section>

    <SupportCta compact />
  </TrainingShell>;
}
