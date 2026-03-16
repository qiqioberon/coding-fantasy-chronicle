import PageLayout from "@/components/PageLayout";

{/* [REPLACE WITH FINAL PRIVACY POLICY TEXT] — All section contents below are placeholders */}

const sections = [
  {
    title: "Who We Are",
    content:
      "Coding Fantasy is a fantasy-themed coding education game developed by Asteria Academy. Our app helps users learn programming through interactive quests, boss battles, and story-driven lessons.",
  },
  {
    title: "Information We Collect",
    content:
      "We collect information you provide when creating an account, including your email address and display name. We also collect gameplay progress data such as quiz scores, level completions, and skill tree unlocks.",
  },
  {
    title: "How We Use Information",
    content:
      "We use your information to provide and improve the Coding Fantasy experience, track your learning progress, maintain leaderboards, and communicate important service updates.",
  },
  {
    title: "Authentication and Google Sign-In",
    content:
      "We use Google Sign-In as our primary authentication method, powered by Supabase Auth. When you sign in with Google, we receive your basic profile information (name, email, and profile picture) as authorized by your Google account settings.",
  },
  {
    title: "Supabase and Backend Services",
    content:
      "Our backend infrastructure is powered by Supabase, which handles authentication, database management, and serverless functions. Your data is stored securely in Supabase-managed PostgreSQL databases with row-level security policies.",
  },
  {
    title: "In-App Purchases and Payment Processing",
    content:
      "Coding Fantasy offers optional in-app purchases for virtual currency (coins). Payments are processed through Google Play Billing. We store transaction records including order IDs and product information but do not have access to your payment card details.",
  },
  {
    title: "Data Sharing and Third Parties",
    content:
      "We do not sell your personal data to third parties. We share data only with essential service providers: Google (authentication), Supabase (backend infrastructure), and Google Play (payment processing).",
  },
  {
    title: "Data Retention",
    content:
      "We retain your account data and gameplay progress for as long as your account is active. If you delete your account, we will remove your personal data and gameplay records within 30 days, except where retention is required by law.",
  },
  {
    title: "Account Deletion",
    content:
      "You can request deletion of your account and associated data at any time through our Delete Account page. Upon deletion, your authentication record, profile data, gameplay progress, and purchase history will be permanently removed.",
  },
  {
    title: "Security",
    content:
      "We implement industry-standard security measures including encrypted connections (HTTPS/TLS), row-level security policies, and secure authentication flows to protect your data.",
  },
  {
    title: "Children and Age Audience",
    content:
      "Coding Fantasy is designed for a general audience interested in learning programming. We do not knowingly collect personal information from children under 13. If we discover that we have collected data from a child under 13, we will promptly delete it.",
  },
  {
    title: "Contact Information",
    /* TODO: Replace with actual support email and company address */
    content:
      "If you have questions about this privacy policy or your data, please contact us at support@example.com.",
  },
];

const PrivacyPolicy = () => {
  return (
    <PageLayout dimmed>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-gold-highlight text-shadow-gold mb-2 text-center">
          Privacy Policy
        </h1>
        {/* TODO: Replace with actual last-updated date */}
        <p className="text-center text-sm text-muted-foreground font-body mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title} className="glass-panel p-6">
              <h2 className="font-display text-xl text-cyan-glow mb-3">
                {s.title}
              </h2>
              {/* [REPLACE WITH FINAL PRIVACY POLICY TEXT] */}
              <p className="text-sm text-cream-text/80 font-body leading-relaxed">
                {s.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
