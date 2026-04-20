"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { portfolioContent } from "@/utils/data/portfolio-content";

const sectionIds = ["hero", "about", "skills", "projects", "experience", "contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioClient() {
  const [theme, setTheme] = useState("dark");
  const [locale, setLocale] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [sending, setSending] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });

  const personal = portfolioContent.personal;
  const copy = portfolioContent[locale];

  const socials = useMemo(
    () => [
      { label: "GitHub", href: personal.github, icon: FiGithub },
      { label: "LinkedIn", href: personal.linkedIn, icon: FiLinkedin },
      { label: "Email", href: `mailto:${personal.email}`, icon: FiMail },
      { label: "WhatsApp", href: personal.whatsapp, icon: FiGlobe },
    ],
    [personal.email, personal.github, personal.linkedIn, personal.whatsapp]
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (preferredDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    toast.success(copy.contact.emailCopied);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success(copy.contact.form.success);
      event.currentTarget.reset();
    } catch (error) {
      toast.error(copy.contact.form.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <motion.div
        className="pointer-events-none fixed z-20 hidden h-40 w-40 rounded-full bg-pink-500/15 blur-3xl lg:block"
        animate={{ x: cursor.x - 80, y: cursor.y - 80 }}
        transition={{ type: "spring", damping: 24, stiffness: 140, mass: 0.4 }}
      />

      <div className="premium-bg" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="orb orb-three" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-slate-950/60">
        <nav className="container flex h-20 items-center justify-between">
          <button
            type="button"
            className="text-left"
            onClick={() => handleNavClick("hero")}
            aria-label="Navigate to top"
          >
            <p className="text-lg font-semibold tracking-tight">{personal.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{personal.location}</p>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {copy.nav.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSection === item.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="icon-btn"
              aria-label="Switch language"
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            >
              {copy.languageLabel}
            </button>
            <button type="button" className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-white/20 bg-white p-4 shadow-2xl dark:bg-slate-900 md:hidden">
          <div className="grid gap-2">
            {copy.nav.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="icon-btn w-full justify-center"
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            >
              {copy.languageLabel}
            </button>
            <button type="button" className="icon-btn w-full justify-center" onClick={toggleTheme}>
              {theme === "dark" ? copy.themeLight : copy.themeDark}
            </button>
          </div>
        </div>
      )}

      <main className="container relative z-10 pb-20">
        <section id="hero" className="section min-h-[86vh] pt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-pink-500">{copy.hero.greeting}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              {personal.name}
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-300">{personal.roleLine}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {copy.hero.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => handleNavClick("projects")} className="cta-btn">
                {copy.hero.primaryCta}
              </button>
              <button onClick={() => handleNavClick("contact")} className="cta-btn-outline">
                {copy.hero.secondaryCta}
              </button>
              <Link href={personal.cvUrl} className="cta-btn-muted" download>
                <FiDownload />
                {copy.hero.tertiaryCta}
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {copy.hero.stats.map((item) => (
              <motion.article
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="glass-card"
              >
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="grid gap-8 lg:grid-cols-[1.6fr_1fr]"
          >
            <article className="glass-card">
              <p className="section-kicker">{copy.about.title}</p>
              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">{copy.about.description}</p>
            </article>
            <aside className="glass-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Focus Areas
              </p>
              <div className="mt-4 space-y-3">
                {copy.about.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <FiCheckCircle className="mt-0.5 text-pink-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </motion.div>
        </section>

        <section id="skills" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-kicker">{copy.skills.title}</p>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{copy.skills.subtitle}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {portfolioContent.skillGroups.map((group, index) => {
                const progressPercent = Math.min(100, 42 + group.items.length * 7);
                return (
                  <motion.article
                    key={group.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="glass-card"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-semibold text-slate-900 dark:text-white">{group.key}</p>
                      <p className="text-xs font-semibold text-pink-500">{progressPercent}%</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span key={skill} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-kicker">{copy.projects.title}</p>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{copy.projects.subtitle}</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {portfolioContent.projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-pink-500/10 dark:bg-slate-900/80"
                >
                  <div className={`mb-5 h-36 rounded-2xl bg-gradient-to-br ${project.accent} p-4`}>
                    <div className="flex h-full items-end justify-between">
                      <FiGrid className="text-2xl text-white/70" />
                      {project.comingSoon && (
                        <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-medium text-white">
                          {copy.projects.comingSoon}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="skill-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3 text-sm">
                    {project.github ? (
                      <Link href={project.github} className="project-link" target="_blank" rel="noreferrer">
                        <FiGithub />
                        {copy.projects.sourceCode}
                      </Link>
                    ) : (
                      <span className="project-link-disabled">{copy.projects.sourceCode}</span>
                    )}
                    {project.demo ? (
                      <Link href={project.demo} className="project-link" target="_blank" rel="noreferrer">
                        <FiArrowUpRight />
                        {copy.projects.liveDemo}
                      </Link>
                    ) : (
                      <span className="project-link-disabled">{copy.projects.liveDemo}</span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="experience" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <p className="section-kicker">{copy.experience.title}</p>
            <div className="mt-7 grid gap-4">
              {portfolioContent.experience.map((item) => (
                <article key={item.company} className="glass-card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
                      <p className="text-sm text-pink-500">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-slate-300/70 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <article className="glass-card">
              <p className="section-kicker">{copy.contact.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy.contact.subtitle}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="form-label">{copy.contact.form.name}</span>
                  <input required name="name" className="input-field" />
                </label>
                <label className="block">
                  <span className="form-label">{copy.contact.form.email}</span>
                  <input required type="email" name="email" className="input-field" />
                </label>
                <label className="block">
                  <span className="form-label">{copy.contact.form.message}</span>
                  <textarea required name="message" rows={5} className="input-field resize-none" />
                </label>
                <button disabled={sending} className="cta-btn w-full justify-center">
                  {sending ? "..." : copy.contact.form.submit}
                </button>
              </form>
            </article>

            <aside className="glass-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {copy.contact.quickLinks}
              </p>
              <div className="mt-4 space-y-3">
                <a href={`mailto:${personal.email}`} className="contact-link">
                  <FiMail />
                  {personal.email}
                </a>
                <button className="contact-link w-full text-left" onClick={handleCopyEmail}>
                  <FiCopy />
                  {copy.contact.copyEmail}
                </button>
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="contact-link">
                      <Icon />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </aside>
          </motion.div>
        </section>
      </main>

      <a
        href="#contact"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-pink-500/40 transition hover:translate-y-[-1px] md:hidden dark:bg-white dark:text-slate-900"
      >
        <FiMail />
        {copy.contact.floatingCta}
      </a>

      <footer className="border-t border-white/10 py-8">
        <div className="container flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 dark:text-slate-400 md:flex-row md:text-left">
          <p>{copy.footer}</p>
          <div className="flex items-center gap-3">
            {socials.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/60 text-slate-700 transition hover:border-pink-500 hover:text-pink-500 dark:border-slate-700 dark:text-slate-200"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
