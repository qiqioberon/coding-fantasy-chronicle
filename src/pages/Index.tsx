import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Code, Map, Swords, Trophy } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MagicButton from "@/components/MagicButton";
import FantasyCard from "@/components/FantasyCard";
import { useI18n } from "@/lib/i18n";
import logoImg from "@/assets/logo.png";
import homeScreenshot from "@/assets/screenshots/home.png";
import levelSelectScreenshot from "@/assets/screenshots/LevelSelect.png";
import loginScreenshot from "@/assets/screenshots/login.png";
import myCharScreenshot from "@/assets/screenshots/myChar.png";
import progressScreenshot from "@/assets/screenshots/progress.png";
import quizPreviewScreenshot from "@/assets/screenshots/QuizPreview.png";
import shopScreenshot from "@/assets/screenshots/shop.png";
import storyPreviewScreenshot from "@/assets/screenshots/StoryPreview.png";
import topicSelectScreenshot from "@/assets/screenshots/TopicSelect.png";

const featureIcons = [Code, Swords, Map, BookOpen, Trophy];

const screenshotAssets = [
  { image: loginScreenshot, label: "login" },
  { image: homeScreenshot, label: "home" },
  { image: topicSelectScreenshot, label: "TopicSelect" },
  { image: levelSelectScreenshot, label: "LevelSelect" },
  { image: storyPreviewScreenshot, label: "StoryPreview" },
  { image: quizPreviewScreenshot, label: "QuizPreview" },
  { image: progressScreenshot, label: "progress" },
  { image: myCharScreenshot, label: "myChar" },
  { image: shopScreenshot, label: "shop" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const { copy } = useI18n();

  return (
    <PageLayout>
      <section className="flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
        <motion.img
          src={logoImg}
          alt="Coding Fantasy Logo"
          className="mb-8 h-32 w-32 drop-shadow-[0_0_40px_hsl(46_100%_61%/0.4)] md:h-64 md:w-64"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <motion.h1
          className="max-w-4xl font-display text-4xl leading-tight text-white text-shadow-gold sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {copy.index.heroTitle}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg font-body text-cream-text/80 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {copy.index.heroDescription}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagicButton size="lg">{copy.index.downloadCta}</MagicButton>
          </a>
          <Link to="/privacy-policy">
            <MagicButton variant="secondary" size="lg">
              {copy.index.privacyCta}
            </MagicButton>
          </Link>
        </motion.div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            className="mb-14 text-center font-display text-3xl text-cyan-glow text-shadow-magic md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            {copy.index.featuresTitle}
          </motion.h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.index.features.map((feature, index) => {
              const Icon = featureIcons[index];

              return (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={index + 1}
                >
                  <FantasyCard className="flex h-full flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-lavender-border/40 bg-gradient-to-br from-mystic-purple to-royal-indigo">
                      <Icon className="h-7 w-7 text-cyan-glow" />
                    </div>
                    <h3 className="mb-2 font-display text-xl text-gold-highlight">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-body text-cream-text/70">
                      {feature.desc}
                    </p>
                  </FantasyCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            className="mb-14 text-center font-display text-3xl text-pink-lilac text-shadow-magic md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            {copy.index.screenshotsTitle}
          </motion.h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {screenshotAssets.map((screen, index) => {
              const localizedScreen = copy.index.screenshots[index];

              return (
                <motion.div
                  key={screen.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={index + 1}
                >
                  <FantasyCard className="h-full overflow-hidden p-0">
                    <div className="relative">
                      <div className="absolute inset-x-4 top-4 z-10 flex justify-start">
                        <span className="rounded-full border border-white/15 bg-night-indigo/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                          {screen.label}
                        </span>
                      </div>
                      <div className="relative aspect-[9/19] overflow-hidden">
                        <img
                          src={screen.image}
                          alt={localizedScreen.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-indigo via-night-indigo/45 to-transparent" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-white">
                        {localizedScreen.title}
                      </h3>
                      <p className="mt-3 text-sm font-body leading-6 text-cream-text/80">
                        {localizedScreen.desc}
                      </p>
                    </div>
                  </FantasyCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <FantasyCard className="text-center">
            <h2 className="mb-4 font-display text-2xl text-cream-text">
              {copy.index.trustTitle}
            </h2>
            <p className="mb-6 text-sm font-body text-cream-text/70">
              {copy.index.trustDescription}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/privacy-policy">
                <MagicButton variant="secondary" size="sm">
                  {copy.index.privacyCta}
                </MagicButton>
              </Link>
              <Link to="/delete-account">
                <MagicButton variant="secondary" size="sm">
                  {copy.index.deleteAccountCta}
                </MagicButton>
              </Link>
            </div>
          </FantasyCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
