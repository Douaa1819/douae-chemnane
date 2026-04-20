export const portfolioContent = {
  personal: {
    name: "Douaa Chemnane",
    roleLine: "Full Stack Developer | Automation Engineer | Problem Solver",
    email: "douaa.chemnane.dev@gmail.com",
    linkedIn: "https://www.linkedin.com/in/douaa-chemnane",
    github: "https://github.com/Douaa1819",
    whatsapp: "https://wa.me/212000000000",
    cvUrl: "/cv-douaa-chemnane.md",
    location: "Marrakesh, Morocco",
  },
  en: {
    nav: [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      greeting: "Hello, I'm",
      tagline:
        "I build scalable products, intelligent automations, and premium digital experiences that feel effortless.",
      primaryCta: "View Projects",
      secondaryCta: "Contact Me",
      tertiaryCta: "Download CV",
      stats: [
        { label: "Years Growing Fast", value: "3+" },
        { label: "Projects Built", value: "12+" },
        { label: "Tech Domains", value: "8+" },
      ],
    },
    about: {
      title: "About Me",
      description:
        "I am a developer focused on building robust software systems and elegant interfaces. My passion is turning complex ideas into secure, scalable, and beautiful products through modern engineering practices, automation, and thoughtful design.",
      highlights: [
        "Scalable backend architecture with Spring ecosystem and microservices",
        "Modern frontend engineering with React, Next.js, and Angular",
        "Automation mindset with CI/CD pipelines, QA flows, and n8n integrations",
      ],
    },
    skills: {
      title: "Technical Expertise",
      subtitle:
        "A balanced stack across engineering, architecture, and product delivery.",
    },
    projects: {
      title: "Featured Projects",
      subtitle:
        "Selected work that combines performance, usability, and engineering quality.",
      comingSoon: "Coming soon",
      sourceCode: "Source Code",
      liveDemo: "Live Demo",
    },
    experience: {
      title: "Experience",
    },
    contact: {
      title: "Let's Build Something Great Together",
      subtitle:
        "Tell me about your idea, product, or collaboration opportunity. I reply quickly.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        success: "Message sent successfully. I will get back to you soon.",
        error: "Unable to send right now. Please use email or LinkedIn.",
      },
      copyEmail: "Copy Email",
      emailCopied: "Email copied to clipboard",
      quickLinks: "Quick Contact",
      floatingCta: "Chat",
    },
    footer: "Designed and built with precision by Douaa Chemnane.",
    languageLabel: "FR",
    themeLight: "Light",
    themeDark: "Dark",
  },
  fr: {
    nav: [
      { id: "hero", label: "Accueil" },
      { id: "about", label: "Profil" },
      { id: "skills", label: "Compétences" },
      { id: "projects", label: "Projets" },
      { id: "experience", label: "Expérience" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      greeting: "Bonjour, je suis",
      tagline:
        "Je conçois des produits évolutifs, des automatisations intelligentes et des expériences digitales premium.",
      primaryCta: "Voir les projets",
      secondaryCta: "Me contacter",
      tertiaryCta: "Télécharger CV",
      stats: [
        { label: "Années d'évolution", value: "3+" },
        { label: "Projets réalisés", value: "12+" },
        { label: "Domaines techniques", value: "8+" },
      ],
    },
    about: {
      title: "À propos",
      description:
        "Je suis développeuse, spécialisée dans la création de systèmes logiciels robustes et d'interfaces élégantes. Ma passion est de transformer des idées complexes en produits sécurisés, évolutifs et visuellement soignés.",
      highlights: [
        "Architecture backend évolutive avec l'écosystème Spring et les microservices",
        "Ingénierie frontend moderne avec React, Next.js et Angular",
        "Approche automation avec pipelines CI/CD, QA et intégrations n8n",
      ],
    },
    skills: {
      title: "Expertise Technique",
      subtitle:
        "Un stack équilibré entre ingénierie, architecture et exécution produit.",
    },
    projects: {
      title: "Projets Sélectionnés",
      subtitle:
        "Des réalisations qui allient performance, expérience utilisateur et qualité logicielle.",
      comingSoon: "Bientôt disponible",
      sourceCode: "Code source",
      liveDemo: "Démo",
    },
    experience: {
      title: "Expérience",
    },
    contact: {
      title: "Construisons quelque chose d'exceptionnel",
      subtitle:
        "Parlez-moi de votre idée, votre produit ou votre besoin de collaboration.",
      form: {
        name: "Nom",
        email: "Email",
        message: "Message",
        submit: "Envoyer",
        success: "Message envoyé avec succès. Je vous répondrai rapidement.",
        error: "Envoi impossible pour le moment. Utilisez email ou LinkedIn.",
      },
      copyEmail: "Copier l'email",
      emailCopied: "Email copié",
      quickLinks: "Contact rapide",
      floatingCta: "Message",
    },
    footer: "Designé et développé avec précision par Douaa Chemnane.",
    languageLabel: "EN",
    themeLight: "Clair",
    themeDark: "Sombre",
  },
  skillGroups: [
    {
      key: "Programming Languages",
      items: ["Java", "TypeScript", "JavaScript", "PHP", "C"],
    },
    {
      key: "Frameworks",
      items: [
        "Spring Boot",
        "Spring Data",
        "Spring Security",
        "Jakarta EE",
        "Hibernate",
        "Laravel",
        "Angular",
        "React",
        "Next.js",
      ],
    },
    {
      key: "Tools & Platforms",
      items: [
        "Git",
        "Docker",
        "Jira",
        "Jenkins",
        "AWS",
        "Selenium",
        "Linux",
        "CI/CD Pipelines",
      ],
    },
    {
      key: "Methodologies",
      items: [
        "Agile",
        "OOP",
        "SOLID Principles",
        "Design Patterns",
        "Microservices",
        "Integration Testing",
        "Algorithm Optimization",
        "n8n Automation",
      ],
    },
    {
      key: "Databases",
      items: ["PostgreSQL", "MySQL", "MongoDB"],
    },
  ],
  projects: [
    {
      title: "Pigeon Racing Management System",
      description:
        "Competition management platform using Spring Boot, MongoDB, and Docker to digitize registrations, competitions, and result tracking for pigeon racing clubs.",
      stack: ["Spring Boot", "MongoDB", "Docker", "REST API"],
      github: "",
      demo: "",
      comingSoon: false,
      accent: "from-pink-500/30 via-fuchsia-500/20 to-violet-500/30",
    },
    {
      title: "Cuisenio - Interactive Culinary Learning Platform",
      description:
        "An innovative learning platform designed to make culinary education intuitive, interactive, and engaging for learners of all skill levels.",
      stack: [
        "Spring Boot",
        "Angular",
        "PostgreSQL",
        "NgRx",
        "JWT",
        "Docker",
      ],
      github: "https://github.com/Douaa1819/Cuisenio.git",
      demo: "",
      comingSoon: false,
      accent: "from-rose-500/30 via-pink-500/20 to-indigo-500/30",
    },
    {
      title: "Next Signature Product",
      description:
        "Reserved for a high-impact upcoming project. This card can be replaced anytime from the data file.",
      stack: ["Coming Soon"],
      github: "",
      demo: "",
      comingSoon: true,
      accent: "from-slate-500/30 via-zinc-500/20 to-neutral-500/30",
    },
  ],
  experience: [
    {
      company: "EPS, Marrakesh",
      role: "Web Developer Intern",
      period: "Internship",
      summary:
        "Contributed to web feature implementation, debugging workflows, and iterative UI improvements in an Agile environment.",
    },
  ],
};
