import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Code, Map, Swords, Trophy } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MagicButton from "@/components/MagicButton";
import FantasyCard from "@/components/FantasyCard";
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

const features = [
  {
    icon: Code,
    title: "Magical Syntax",
    desc: "Learn real programming concepts wrapped in enchanting spell-casting mechanics.",
  },
  {
    icon: Swords,
    title: "Epic Boss Battles",
    desc: "Test your coding skills against fearsome bosses in thrilling combat challenges.",
  },
  {
    icon: Map,
    title: "Kingdom Quests",
    desc: "Explore a vast fantasy world filled with coding puzzles and hidden treasures.",
  },
  {
    icon: BookOpen,
    title: "Story-Driven Learning",
    desc: "Immerse yourself in rich narratives that make every lesson an adventure.",
  },
  {
    icon: Trophy,
    title: "Skill Trees & Badges",
    desc: "Unlock powerful abilities and earn legendary badges as you master new topics.",
  },
];

const screenshots = [
  {
    image: loginScreenshot,
    title: "Login Gate",
    label: "login",
    desc: "A clean entry portal that welcomes every player into the kingdom with a quick sign-in flow.",
  },
  {
    image: homeScreenshot,
    title: "Royal Home Hub",
    label: "home",
    desc: "Your central command room for tracking coins, daily goals, and the next adventure waiting to begin.",
  },
  {
    image: topicSelectScreenshot,
    title: "Topic Select",
    label: "TopicSelect",
    desc: "Pick the branch of knowledge you want to conquer and start shaping your own magical learning path.",
  },
  {
    image: levelSelectScreenshot,
    title: "Level Map",
    label: "LevelSelect",
    desc: "A quest-map style progression screen that turns each lesson into a destination worth unlocking.",
  },
  {
    image: storyPreviewScreenshot,
    title: "Story Preview",
    label: "StoryPreview",
    desc: "Narrative-driven lessons pull players into the lore before concepts turn into practical coding missions.",
  },
  {
    image: quizPreviewScreenshot,
    title: "Quiz Battle",
    label: "QuizPreview",
    desc: "Knowledge checks feel like encounters, keeping practice sharp, focused, and tied to the adventure.",
  },
  {
    image: progressScreenshot,
    title: "Progress Tracker",
    label: "progress",
    desc: "A dedicated progress view makes growth visible, from completed paths to rewards earned along the way.",
  },
  {
    image: myCharScreenshot,
    title: "My Character",
    label: "myChar",
    desc: "Customize your hero and give the learning journey a personal identity that feels earned.",
  },
  {
    image: shopScreenshot,
    title: "Kingdom Shop",
    label: "shop",
    desc: "Spend hard-earned coins on premium-looking upgrades that reinforce the game's reward loop.",
  },
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
  return (
    <PageLayout>
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.img
          src={logoImg}
          alt="Coding Fantasy Logo"
          className="w-32 h-32 md:w-64 md:h-64 mb-8 drop-shadow-[0_0_40px_hsl(46_100%_61%/0.4)]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl text-white text-shadow-gold leading-tight max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Master the Code, Rule the Kingdom
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-cream-text/80 max-w-2xl font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Embark on a fantasy-themed coding adventure. Learn programming by
          battling bosses, completing quests, and building your own magical
          kingdom.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagicButton size="lg">Download on Google Play</MagicButton>
          </a>
          <Link to="/privacy-policy">
            <MagicButton variant="secondary" size="lg">
              Privacy Policy
            </MagicButton>
          </Link>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="font-display text-3xl md:text-4xl text-center text-cyan-glow text-shadow-magic mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            Your Coding Quest Awaits
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={index + 1}
              >
                <FantasyCard className="h-full flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mystic-purple to-royal-indigo flex items-center justify-center mb-4 border border-lavender-border/40">
                    <feature.icon className="w-7 h-7 text-cyan-glow" />
                  </div>
                  <h3 className="font-display text-xl text-gold-highlight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-cream-text/70 font-body">
                    {feature.desc}
                  </p>
                </FantasyCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="font-display text-3xl md:text-4xl text-center text-pink-lilac text-shadow-magic mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            A Glimpse Into the Kingdom
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {screenshots.map((screen, index) => (
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
                        alt={screen.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-indigo via-night-indigo/45 to-transparent" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-white">
                      {screen.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-cream-text/80 font-body">
                      {screen.desc}
                    </p>
                  </div>
                </FantasyCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FantasyCard className="text-center">
            <h2 className="font-display text-2xl text-cream-text mb-4">
              Your Trust Matters
            </h2>
            <p className="text-sm text-cream-text/70 font-body mb-6">
              We care about your privacy and give you full control over your
              data. Read our policies or manage your account anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/privacy-policy">
                <MagicButton variant="secondary" size="sm">
                  Privacy Policy
                </MagicButton>
              </Link>
              <Link to="/delete-account">
                <MagicButton variant="secondary" size="sm">
                  Delete Account
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
