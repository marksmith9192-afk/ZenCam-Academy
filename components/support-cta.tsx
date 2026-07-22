export function SupportCta({ compact = false }: { compact?: boolean }) {
  return <section className={compact ? "support-cta compact" : "support-cta"}>
    <div>
      <span>Traxxis customer support</span>
      <h2>Have a question or want more in-depth training?</h2>
      <p>Our fleet technology specialists can help with product questions, tailored training, and guidance for your team.</p>
    </div>
    <div className="support-actions">
      <a className="support-primary" href="mailto:support@traxxisgps.com?subject=ZenduONE%20training%20request">Email Traxxis Support</a>
      <a href="tel:+18884477059">Call 1-888-447-7059 ext. 101</a>
      <small>Monday–Friday, 8 a.m.–6 p.m. ET</small>
    </div>
  </section>;
}
