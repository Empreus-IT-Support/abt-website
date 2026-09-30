import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ABT Auto Body Technicians",
  description:
    "How ABT Auto Body Technicians collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

const INK = "#141813";
const TEXT = "#2e342e";
const MUTED = "#5d655d";
const GREEN_DARK = "#1f6526";
const BAND = "#f3f6f2";

const LAST_UPDATED = "30 September 2026";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        ABT Auto Body Technicians is a Canberra auto body repair business.
        This policy explains how we handle personal information collected
        through this website, in line with the Australian Privacy Principles
        in the Privacy Act 1988 (Cth).
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <p>
        The only personal information this website collects is what you choose
        to send us through the contact and quote forms: your name, contact
        details, message, and any details or photos you provide about your
        vehicle for a quote. Our hosting provider also keeps short-lived
        technical logs (such as IP addresses) for security and to keep the
        site running reliably.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        We use your details for one purpose: to respond to you about your
        repair or quote. Form submissions are delivered to our office email
        and are not stored in a database on this website. We do not use your
        details for marketing lists, and we never sell personal information.
      </p>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <p>
        This website does not set advertising cookies or run third-party
        trackers. We use our hosting platform&rsquo;s privacy-friendly
        analytics, which counts page visits in aggregate without cookies and
        without identifying or tracking individual visitors across sites.
      </p>
    ),
  },
  {
    heading: "Who else sees it",
    body: (
      <p>
        Your enquiry passes through the service providers that run this
        website: our hosting platform and our transactional email provider,
        which delivers the message to us over an encrypted connection. These
        providers process the data only to provide those services. Beyond
        that, we disclose personal information only where the law requires it.
      </p>
    ),
  },
  {
    heading: "Access, correction and complaints",
    body: (
      <p>
        You can ask us at any time what personal information we hold about
        you, ask us to correct it, or ask us to delete it by emailing{" "}
        <a
          href="mailto:admin@autobodytech.net.au"
          style={{ color: GREEN_DARK, fontWeight: 600 }}
        >
          admin@autobodytech.net.au
        </a>{" "}
        or calling 02 6241 3801. If you are not satisfied with our response,
        you can complain to the Office of the Australian Information
        Commissioner (oaic.gov.au).
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "#ffffff", color: TEXT }}>
      <section style={{ background: BAND, padding: "120px 24px 56px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              color: GREEN_DARK,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: 13,
            }}
          >
            Your information
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), var(--font-body), sans-serif",
              color: INK,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              margin: "12px 0 8px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: MUTED, fontSize: 14 }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </section>
      <section style={{ padding: "56px 24px 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {sections.map((s, i) => (
            <div key={s.heading} style={{ marginTop: i === 0 ? 0 : 40 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display), var(--font-body), sans-serif",
                  color: INK,
                  fontSize: 22,
                  marginBottom: 10,
                }}
              >
                {s.heading}
              </h2>
              <div style={{ lineHeight: 1.7, color: TEXT }}>{s.body}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
