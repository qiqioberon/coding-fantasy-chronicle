import PageLayout from "@/components/PageLayout";
import { useI18n } from "@/lib/i18n";

const PrivacyPolicy = () => {
  const { copy } = useI18n();

  return (
    <PageLayout dimmed>
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-2 text-center font-display text-3xl text-gold-highlight text-shadow-gold md:text-4xl">
          {copy.privacyPolicy.title}
        </h1>
        <p className="mb-12 text-center text-sm font-body text-muted-foreground">
          {copy.privacyPolicy.lastUpdated}
        </p>

        <div className="space-y-8">
          {copy.privacyPolicy.sections.map((section) => (
            <section key={section.title} className="glass-panel p-6">
              <h2 className="mb-3 font-display text-xl text-cyan-glow">
                {section.title}
              </h2>
              <p className="text-sm font-body leading-relaxed text-cream-text/80">
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
