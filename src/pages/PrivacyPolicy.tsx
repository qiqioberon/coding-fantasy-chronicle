import PageLayout from "@/components/PageLayout";

const sections = [
  {
    title: "Overview",
    content:
      "This Privacy Policy applies to the Coding Fantasy mobile game and its companion web pages, including the Privacy Policy and Delete Account pages. Coding Fantasy is a fantasy-themed educational game that stores account, gameplay, and purchase-related data so the app can authenticate players, preserve progress, and provide account management features.",
  },
  {
    title: "Information We Collect",
    content:
      "Depending on how you use the service, we may collect your email address, Google account profile information that you authorize during sign-in, your username, avatar URL, equipped character selection, level, EXP, coins, story completion records, quiz results, badge unlocks, boss completion records, daily quest progress, leaderboard-related profile data, and coin purchase claim records such as product ID, order ID, purchase token, purchase state, and related timestamps.",
  },
  {
    title: "How We Use Information",
    content:
      "We use this information to sign you in, create and maintain your player profile, save gameplay progress, calculate level and reward changes, unlock badges, maintain leaderboard data, verify eligible coin purchases, support the Delete Account flow, and operate the Coding Fantasy experience across the mobile app and related web pages.",
  },
  {
    title: "Authentication and Google Sign-In",
    content:
      "Coding Fantasy uses Supabase Auth for authentication. The current app flow relies on Google Sign-In or Google OAuth rather than guest login. When you sign in with Google, we may receive basic account information such as your email address and profile picture, subject to the permissions and information made available by your Google account.",
  },
  {
    title: "Backend and Storage",
    content:
      "Coding Fantasy uses Supabase as its backend platform for authentication, database storage, and Edge Functions. Account and gameplay data are stored in Supabase-managed PostgreSQL tables. The current backend implementation uses authenticated access controls and row-level security policies for player-owned data in the main gameplay tables.",
  },
  {
    title: "Gameplay, Progress, and Leaderboards",
    content:
      "The service stores gameplay-related records so your account can keep track of progression and rewards. This includes profile progression such as level, EXP, and coins, as well as level-node completions, story rewards, quiz rewards, boss rewards, badge unlocks, daily quest status, and leaderboard-related profile fields such as username, avatar URL, and level.",
  },
  {
    title: "In-App Purchases",
    content:
      "On Android, Coding Fantasy supports optional coin purchases through Google Play Billing. The current implementation verifies purchase data through a Supabase Edge Function that communicates with the Google Play Developer API before awarding coins. We may store product identifiers, order identifiers, purchase tokens, package names, purchase state, awarded coin amounts, and related timestamps. We do not process or store your payment card details directly.",
  },
  {
    title: "Third-Party Services",
    content:
      "The current implementation relies primarily on Google services for sign-in and Google Play purchase processing, and on Supabase for authentication, storage, database operations, and server-side functions. We do not sell your personal data. We only share data with service providers when it is necessary to operate the app, process sign-in, verify purchases, or support account-related features.",
  },
  {
    title: "Account Deletion",
    content:
      "You can request account deletion through the Delete Account page on the Coding Fantasy web companion. The current delete-account function is designed to remove the authenticated account and related records including the profile, gameplay progress records, badge unlocks, daily quest progress, and coin purchase claim records associated with that user, then delete the authentication account itself.",
  },
  {
    title: "Data Retention",
    content:
      "We retain account and gameplay data while your account remains active so the service can provide saved progress and account functionality. If you request deletion and the delete flow completes successfully, the current implementation attempts to delete the associated account and related gameplay records immediately. We may still retain limited data where required for security, fraud prevention, operational integrity, or legal compliance.",
  },
  {
    title: "Security",
    content:
      "The current service uses secure authentication flows, HTTPS/TLS network communication, and backend access controls provided through Supabase. While no system can guarantee absolute security, we take reasonable steps within the implemented architecture to protect account and gameplay data.",
  },
  {
    title: "Children's Privacy",
    content:
      "Coding Fantasy is intended for a general audience interested in learning programming. If you believe personal information has been provided to us by a child in a way that should be removed or reviewed, please contact us using the address below so we can assess the request.",
  },
  {
    title: "Contact Information",
    content:
      "If you have questions about this Privacy Policy or your account data, please contact us at asteriaacademy.id@gmail.com.",
  },
];

const PrivacyPolicy = () => {
  return (
    <PageLayout dimmed>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-gold-highlight text-shadow-gold mb-2 text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-muted-foreground font-body mb-12">
          Last updated: March 16, 2026
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="glass-panel p-6">
              <h2 className="font-display text-xl text-cyan-glow mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-cream-text/80 font-body leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
