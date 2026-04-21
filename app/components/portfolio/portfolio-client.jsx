"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCopy,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiGitBranch,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { portfolioContent } from "@/utils/data/portfolio-content";

const sectionIds = [
  "hero",
  "about",
  "services",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const SERVICE_ICONS = {
  layers: FiLayers,
  database: FiDatabase,
  cpu: FiCpu,
  cloud: FiCloud,
  "git-branch": FiGitBranch,
};

const EXP_ICONS = {
  briefcase: FiBriefcase,
  cpu: FiCpu,
  code: FiCode,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PortfolioClient() {
  const [theme, setTheme] = useState("dark");
  const [locale, setLocale] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [sending, setSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [projectFilter, setProjectFilter] = useState("all");
  const [errors, setErrors] = useState({});

  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 300 : 140,
    damping: reduceMotion ? 50 : 24,
    mass: 0.2,
  });

  const personal = portfolioContent.personal;
  const copy = portfolioContent[locale];

  const socials = useMemo(
    () => [
      { label: "GitHub", href: personal.github, icon: FiGithub },
      { label: "LinkedIn", href: personal.linkedIn, icon: FiLinkedin },
      { label: "Email", href: `mailto:${personal.email}`, icon: FiMail },
    ],
    [personal.email, personal.github, personal.linkedIn]
  );

  const contactSocials = useMemo(
    () => socials.filter((item) => item.label !== "Email"),
    [socials]
  );

  const tSection = reduceMotion ? { duration: 0.01 } : { duration: 0.5 };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (preferredDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr" : "en";
  }, [locale]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
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

  const validateForm = (payload) => {
    const next = {};
    if (!payload.name || String(payload.name).trim().length < 2) {
      next.name = copy.contact.form.validationName;
    }
    if (!payload.email || !EMAIL_RE.test(String(payload.email).trim())) {
      next.email = copy.contact.form.validationEmail;
    }
    if (!payload.message || String(payload.message).trim().length < 10) {
      next.message = copy.contact.form.validationMessage;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSuccess(false);
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    if (!validateForm(payload)) {
      return;
    }

    setSending(true);
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
      setFormSuccess(true);
      event.currentTarget.reset();
      setErrors({});
      window.setTimeout(() => setFormSuccess(false), 3200);
    } catch {
      toast.error(copy.contact.form.error);
    } finally {
      setSending(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return portfolioContent.projects.filter((p) => {
      if (projectFilter === "all") return true;
      return p.filter === projectFilter;
    });
  }, [projectFilter]);

  const servicesLocalized = portfolioContent.services.map((s) => ({
    ...s,
    title: locale === "fr" ? s.fr.title : s.en.title,
    description: locale === "fr" ? s.fr.description : s.en.description,
  }));

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.45 }}
    >
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden />

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none fixed z-20 hidden h-48 w-48 rounded-full bg-brand/10 blur-3xl lg:block"
          style={{ willChange: "transform" }}
          animate={{ x: cursor.x - 96, y: cursor.y - 96 }}
          transition={{ type: "spring", damping: 28, stiffness: 120, mass: 0.35 }}
          aria-hidden
        />
      )}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="mesh-hero" />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-surface-border dark:bg-[#0a0a0f]/75 supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]">
        <nav
          className="container flex h-16 min-h-[4rem] items-center justify-between sm:h-[4.25rem]"
          aria-label="Primary"
        >
          <button
            type="button"
            className="touch-manipulation text-left"
            onClick={() => handleNavClick("hero")}
            aria-label="Home"
          >
            <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-ink sm:text-lg">
              {personal.displayName}
            </p>
            <p className="text-xs text-slate-500 dark:text-ink-muted">{personal.location}</p>
          </button>

          <div className="desktop-nav items-center gap-0.5">
            {copy.nav.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`touch-manipulation rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                  activeSection === item.id
                    ? "bg-brand/10 text-brand"
                    : "text-slate-600 hover:text-slate-900 dark:text-ink-muted dark:hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              className="icon-btn touch-manipulation !h-10 !min-h-[40px] !w-10 !min-w-[40px] rounded-lg text-xs font-semibold"
              aria-label="Switch language"
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            >
              {copy.languageLabel}
            </button>
            <button
              type="button"
              className="icon-btn touch-manipulation !h-10 !min-h-[40px] !w-10 !min-w-[40px] rounded-lg"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <FiSun className="h-[18px] w-[18px]" /> : <FiMoon className="h-[18px] w-[18px]" />}
            </button>
          </div>

          <button
            type="button"
            className="icon-btn mobile-menu-btn touch-manipulation !h-10 !w-10 rounded-lg"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm"
          aria-label={locale === "fr" ? "Fermer le menu" : "Close menu"}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="mobile-menu-panel fixed inset-x-3 top-[calc(3.75rem+env(safe-area-inset-top,0px))] z-40 max-h-[min(72vh,calc(100dvh-5rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-surface-border dark:bg-surface-card"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "fr" ? "Menu de navigation" : "Mobile navigation menu"}
        >
          <div className="grid gap-1">
            {copy.nav.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="touch-manipulation rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-ink dark:hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3 dark:border-surface-border">
            <button
              type="button"
              className="icon-btn flex-1 touch-manipulation justify-center rounded-lg text-xs font-semibold"
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            >
              {copy.languageLabel}
            </button>
            <button
              type="button"
              className="icon-btn flex-1 touch-manipulation justify-center rounded-lg text-xs"
              onClick={toggleTheme}
            >
              {theme === "dark" ? copy.themeLight : copy.themeDark}
            </button>
          </div>
        </div>
      )}

      <main
        id="main-content"
        tabIndex={-1}
        className="container relative z-10 overflow-x-clip pb-28 max-md:pb-[max(7rem,env(safe-area-inset-bottom,0px))]"
      >
        {/* Hero */}
        <section
          id="hero"
          className="section relative flex min-h-[calc(100vh-4.25rem)] flex-col justify-center pt-14 sm:pt-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-b from-brand/[0.07] via-transparent to-transparent dark:from-brand/10" />

          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl px-2 sm:px-4"
          >
            <motion.p
              variants={heroItem}
              className="text-[13px] font-medium uppercase tracking-[0.28em] text-brand sm:text-sm"
            >
              {copy.hero.hello}
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="heading-xl mt-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text font-bold text-transparent dark:from-white dark:via-ink dark:to-ink-muted"
            >
              {copy.hero.headline}
            </motion.h1>
            <motion.p variants={heroItem} className="mt-5 text-lg font-semibold tracking-tight text-slate-700 dark:text-ink sm:text-xl">
              {personal.roleLine}
            </motion.p>
            <motion.p variants={heroItem} className="body-text mt-7 max-w-2xl">
              {copy.hero.tagline}
            </motion.p>

            <motion.div variants={heroItem} className="mt-6 flex flex-wrap gap-2">
              {copy.hero.identity.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-slate-200/90 bg-white/70 px-3 py-1 text-[12px] font-medium text-slate-600 shadow-sm dark:border-surface-border dark:bg-white/[0.04] dark:text-ink-muted"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={heroItem} className="mt-11 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleNavClick("projects")}
                className="cta-btn touch-manipulation min-w-[140px]"
              >
                {copy.hero.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="cta-btn-outline touch-manipulation min-w-[140px]"
              >
                {copy.hero.secondaryCta}
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={tSection}
            className="grid gap-10 lg:grid-cols-[1.55fr_1fr]"
          >
            <article className="premium-card-hover">
              <p className="section-kicker">{copy.about.title}</p>
              <div className="mt-6 space-y-4">
                {copy.about.paragraphs.map((p, i) => (
                  <p key={`about-${i}`} className="body-text">
                    {p}
                  </p>
                ))}
              </div>
            </article>
            <aside className="premium-card-hover flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-ink-muted">
                  {copy.about.focusAreasTitle}
                </p>
                <ul className="mt-5 space-y-3">
                  {copy.about.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-ink-muted">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            transition={tSection}
          >
            <p className="section-kicker">{copy.services.title}</p>
            <p className="body-text mt-3 max-w-2xl">{copy.services.subtitle}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesLocalized.map((svc, index) => {
                const Icon = SERVICE_ICONS[svc.icon] || FiLayers;
                return (
                  <motion.article
                    key={svc.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.4, delay: index * 0.05 }}
                    whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                    className="group premium-card-hover relative overflow-hidden border-brand/0 hover:border-brand/20 hover:shadow-glow-sm"
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/20" />
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-ink">{svc.title}</h3>
                    <p className="body-text mt-2 text-sm">{svc.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            transition={tSection}
          >
            <p className="section-kicker">{copy.skills.title}</p>
            <p className="body-text mt-3 max-w-2xl">{copy.skills.subtitle}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {portfolioContent.skillGroups.map((group, index) => {
                const progressPercent = Math.min(100, 40 + group.items.length * 6);
                return (
                  <motion.article
                    key={group.key}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, delay: index * 0.04 }}
                    className="premium-card-hover"
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-ink">{group.key}</p>
                      <span className="text-[11px] font-semibold text-brand">{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-surface-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, delay: 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-brand to-brand-glow"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
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

        {/* Experience timeline */}
        <section id="experience" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={tSection}
          >
            <p className="section-kicker">{copy.experience.title}</p>
            <p className="body-text mt-3 max-w-2xl">{copy.experience.subtitle}</p>

            <div className="relative mt-12 space-y-6 pl-2 md:pl-4">
              <div className="timeline-line" aria-hidden />
              {portfolioContent.experience.map((item, idx) => {
                const Icon = EXP_ICONS[item.icon] || FiBriefcase;
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.45, delay: idx * 0.06 }}
                    className="group relative pl-10 md:pl-12"
                  >
                    <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand/40 bg-white shadow-sm dark:bg-surface-card">
                      <Icon className="h-3.5 w-3.5 text-brand" aria-hidden />
                    </div>
                    <div className="premium-card-hover transition group-hover:border-brand/25 group-hover:shadow-glow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-ink">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-brand">
                            {item.company} · {item.location}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-surface-border dark:text-ink-muted">
                          {item.arrangement}
                        </span>
                      </div>
                      <ul className="mt-5 space-y-2.5">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-ink-muted"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={tSection}
          >
            <p className="section-kicker">{copy.projects.title}</p>
            <p className="body-text mt-3 max-w-2xl">{copy.projects.subtitle}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { id: "all", label: copy.projects.filterAll },
                { id: "web", label: copy.projects.filterWeb },
                { id: "ai", label: copy.projects.filterAi },
                { id: "backend", label: copy.projects.filterBackend },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setProjectFilter(f.id)}
                  className={`filter-pill touch-manipulation ${projectFilter === f.id ? "filter-pill-active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 ? (
              <p className="body-text mt-10 text-center text-slate-500 dark:text-ink-muted">
                {copy.projects.filterEmpty}
              </p>
            ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.42, delay: index * 0.06 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group premium-card-hover relative overflow-hidden border-slate-200/90 dark:border-surface-border"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.06] via-transparent to-brand-glow/[0.04] opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex h-28 items-end rounded-xl bg-gradient-to-br from-slate-900/5 to-brand/10 p-4 dark:from-white/[0.03] dark:to-brand/15">
                    <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm dark:bg-surface-card">
                      {project.filter}
                    </span>
                  </div>
                  <div className="relative mt-5">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-ink">{project.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-ink-muted">
                      {copy.projects.roleLabel}: {project.role}
                    </p>
                    <p className="body-text mt-3 text-sm">{project.description}</p>
                    <p className="mt-3 text-sm text-slate-700 dark:text-ink-muted">
                      <span className="font-semibold text-slate-900 dark:text-ink">{copy.projects.impactLabel}: </span>
                      {project.impact}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <span key={s} className="skill-pill">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.github ? (
                        <Link
                          href={project.github}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiGithub className="h-4 w-4" />
                          {copy.projects.sourceCode}
                        </Link>
                      ) : (
                        <span className="project-link-disabled">{copy.projects.sourceCode}</span>
                      )}
                      {project.demo ? (
                        <Link href={project.demo} className="project-link" target="_blank" rel="noreferrer">
                          <FiArrowUpRight className="h-4 w-4" />
                          {copy.projects.liveDemo}
                        </Link>
                      ) : (
                        <span className="project-link-disabled">{copy.projects.liveDemo}</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            )}
          </motion.div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={tSection}
            className="mx-auto max-w-lg text-center"
          >
            <p className="section-kicker">{copy.certifications.title}</p>
            <p className="body-text mt-3">{copy.certifications.subtitle}</p>
            {portfolioContent.certifications.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={reduceMotion ? { duration: 0.01 } : { duration: 0.45 }}
                className="premium-card-hover mx-auto mt-10 border-brand/15 px-8 py-10"
              >
                <div className="mx-auto flex max-w-[140px] justify-center">
                  <Image
                    src={cert.badgeImage}
                    alt={cert.name}
                    width={120}
                    height={120}
                    className="drop-shadow-md dark:opacity-95"
                  />
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-900 dark:text-ink">{cert.name}</p>
                <p className="text-sm text-slate-500 dark:text-ink-muted">{cert.issuer}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-btn mt-8 inline-flex w-full touch-manipulation justify-center sm:w-auto"
                >
                  {copy.certifications.oracleCta}
                  <FiArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            transition={tSection}
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <article className="premium-card-hover relative min-w-0 overflow-hidden">
              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-0 top-0 flex items-center justify-center gap-2 bg-emerald-500/95 py-3 text-sm font-semibold text-white"
                >
                  <FiCheckCircle className="h-4 w-4" />
                  {copy.contact.form.success}
                </motion.div>
              )}
              <p className="section-kicker">{copy.contact.title}</p>
              <p className="body-text mt-3 text-sm">{copy.contact.subtitle}</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
                <label className="block">
                  <span className="form-label">{copy.contact.form.name}</span>
                  <input
                    name="name"
                    autoComplete="name"
                    className={`input-field ${errors.name ? "input-field-error" : ""}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <span id="err-name" className="mt-1 block text-xs text-red-500">
                      {errors.name}
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="form-label">{copy.contact.form.email}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={`input-field ${errors.email ? "input-field-error" : ""}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email && (
                    <span id="err-email" className="mt-1 block text-xs text-red-500">
                      {errors.email}
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="form-label">{copy.contact.form.message}</span>
                  <textarea
                    name="message"
                    rows={5}
                    className={`input-field resize-none ${errors.message ? "input-field-error" : ""}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-msg" : undefined}
                  />
                  {errors.message && (
                    <span id="err-msg" className="mt-1 block text-xs text-red-500">
                      {errors.message}
                    </span>
                  )}
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="cta-btn w-full touch-manipulation justify-center disabled:opacity-60"
                >
                  {sending ? copy.contact.form.sending : copy.contact.form.submit}
                </button>
              </form>
            </article>

            <aside className="premium-card-hover min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-ink-muted">
                {copy.contact.quickLinks}
              </p>
              <div className="mt-5 space-y-3">
                <a href={`mailto:${personal.email}`} className="contact-link">
                  <FiMail className="h-4 w-4 shrink-0 text-brand" />
                  <span className="truncate">{personal.email}</span>
                </a>
                <button
                  type="button"
                  className="contact-link w-full touch-manipulation text-left"
                  onClick={handleCopyEmail}
                >
                  <FiCopy className="h-4 w-4 shrink-0 text-brand" />
                  {copy.contact.copyEmail}
                </button>
                {contactSocials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-link"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-brand" />
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
        className="fixed z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-blue-600 max-md:bottom-[max(1rem,env(safe-area-inset-bottom,0px))] max-md:right-[max(0.75rem,env(safe-area-inset-right,0px))] md:hidden"
      >
        <FiMail className="h-4 w-4" />
        {copy.contact.floatingCta}
      </a>

      <footer className="border-t border-slate-200 py-10 dark:border-surface-border">
        <div className="container flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 dark:text-ink-muted md:flex-row md:text-left">
          <p>{copy.footer}</p>
          <div className="flex items-center gap-2">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-brand/40 hover:text-brand dark:border-surface-border dark:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
