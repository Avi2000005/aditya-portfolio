// ============================================================
// SITE CONFIG — Edit this file to update all site content.
// No need to touch any component files.
// ============================================================

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────
  name: "Aditya Khedkar",
  tagline: "Cinematic Videographer & Digital Marketer",
  headline: "Cinematic stories that help brands grow.",
  subtext:
    "Combining visual storytelling with SEO and performance marketing to help brands stand out and convert.",
  siteUrl: "https://adityakhedkar.com", // update after deployment

  // ── Contact ───────────────────────────────────────────────
  contact: {
    phone: "+91 88578 84440",
    phoneTel: "tel:+918857884440",
    whatsapp: "https://wa.me/918857884440",
    email: "adityakhedkar761@gmail.com",
    emailLink: "mailto:adityakhedkar761@gmail.com",
  },

  // ── Social Links ──────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/", // replace with real handle
    youtube: "https://youtube.com/", // replace with real channel
    linkedin: "https://linkedin.com/in/", // replace with real profile
  },

  // ── Stats ─────────────────────────────────────────────────
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Brands Handled", value: "10+" },
    { label: "Years of Experience", value: "3+" },
  ],

  // ── Trust Line ────────────────────────────────────────────
  trustLine: "Currently handling:",
  trustBrands: [
    "renvora.in",
    "shivcoretech.com",
    "suyogcoachingclasses.in",
    "snehsarees.in",
  ],

  // ── Navigation ────────────────────────────────────────────
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  // ── Video Paths (configurable base paths) ────────────────
  // If you place cinematic videos directly in /public (not in /public/cinematic/),
  // change cinematicBasePath to ""
  marketingBasePath: "/adMarketing/",
  cinematicBasePath: "/cinematic/",

  // ── Marketing Videos ─────────────────────────────────────
  marketingVideos: [
    {
      id: "mkt1",
      file: "marketing1.mp4",
      poster: "marketing1.jpg",
      title: "Aarambh Car Decor — Commercial Ad",
      brand: "",
      role: "",
      externalUrl: "",
      instagramUrl: "https://www.instagram.com/reel/Dab9bV-MDbg/?stkn=OXk2cG5uZHVpa3Q0",
    },
    {
      id: "mkt2",
      file: "marketing2.mp4",
      poster: "marketing2.jpg",
      title: "Suyog Coaching Classes — Promotional Campaign",
      brand: "",
      role: "",
      externalUrl: "",
      instagramUrl: "",
    },
    {
      id: "mkt3",
      file: "marketing3.mp4",
      poster: "marketing3.jpg",
      title: "Premium Chai Sutta — Grand Opening Ad",
      brand: "",
      role: "",
      externalUrl: "",
      instagramUrl: "https://www.instagram.com/reel/DaX1JgVsTIH/?stkn=MWE5eTBsdWplODdzZQ==",
    },
    {
      id: "mkt4",
      file: "marketing4.mp4",
      poster: "marketing4.jpg",
      title: "Sant Parampara — Store Showcase Commercial",
      brand: "",
      role: "",
      externalUrl: "",
      instagramUrl: "https://www.instagram.com/reel/DascuTSTiyB/?stkn=MXZqYnpydmdrZjlqOA==",
    },
  ] as MarketingVideo[],

  // ── Cinematic Reels (All 7 videos) ────────────────────────
  cinematicVideos: [
    {
      id: "cin1",
      file: "cinematic1.mp4",
      poster: "cinematic1.jpg",
      title: "Reel 01",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin2",
      file: "cinematic2.mp4",
      poster: "cinematic2.jpg",
      title: "Reel 02",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin3",
      file: "cinematic3.mp4",
      poster: "cinematic3.jpg",
      title: "Reel 03",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin4",
      file: "cinematic4.mp4",
      poster: "cinematic4.jpg",
      title: "Reel 04",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin5",
      file: "cinematic5.mp4",
      poster: "cinematic5.jpg",
      title: "Reel 05",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin6",
      file: "cinematic6.mp4",
      poster: "cinematic6.jpg",
      title: "Reel 06",
      client: "",
      externalUrl: "",
    },
    {
      id: "cin7",
      file: "cinematic7.mp4",
      poster: "cinematic7.jpg",
      title: "Reel 07",
      client: "",
      externalUrl: "",
    },
  ] as CinematicVideo[],

  // ── Brands I've Handled ───────────────────────────────────
  brands: [
    {
      id: "b1",
      name: "renvora.in",
      url: "https://renvora.in",
      role: "SEO",
      description: "Full-spectrum SEO strategy and content optimization.",
    },
    {
      id: "b2",
      name: "shivcoretech.com",
      url: "https://shivcoretech.com",
      role: "SEO",
      description: "Technical SEO, keyword research, and rank tracking.",
    },
    {
      id: "b3",
      name: "suyogcoachingclasses.in",
      url: "https://suyogcoachingclasses.in",
      role: "SEO",
      description: "Local SEO and lead generation campaigns.",
    },
    {
      id: "b4",
      name: "snehsarees.in",
      url: "https://snehsarees.in",
      role: "Frontend Development",
      description: "Website design & development with React/Next.js.",
    },
  ],

  // ── Services ──────────────────────────────────────────────
  services: [
    {
      id: "svc1",
      category: "Cinematic",
      icon: "film",
      items: [
        "Brand films & commercials",
        "Reels & short-form content",
        "Ad shoots & product videos",
        "Event films & documentaries",
        "Editing & color grading",
      ],
    },
    {
      id: "svc2",
      category: "Digital Marketing",
      icon: "trending-up",
      items: [
        "Search Engine Optimisation (SEO)",
        "Social media strategy",
        "Performance & Meta Ads",
        "Website frontend development",
        "Content strategy & planning",
      ],
    },
  ],

  // ── Process Steps ─────────────────────────────────────────
  process: [
    {
      step: 1,
      title: "Brief",
      description: "Deep-dive into your brand, goals, and target audience.",
    },
    {
      step: 2,
      title: "Strategy",
      description: "Craft a tailored content and marketing roadmap.",
    },
    {
      step: 3,
      title: "Shoot / Build",
      description: "Execute with precision — on set or in the studio.",
    },
    {
      step: 4,
      title: "Edit / Optimise",
      description: "Polish every frame and tune every keyword.",
    },
    {
      step: 5,
      title: "Launch & Report",
      description: "Go live, track results, and iterate for growth.",
    },
  ],

  // ── About ─────────────────────────────────────────────────
  about: {
    // PLACEHOLDER — replace with your real story
    story: `I'm Aditya Khedkar, a cinematic videographer and digital marketer based in India. 
I believe that great visuals and smart strategy go hand in hand. Whether it's a brand film that stops the scroll 
or an SEO campaign that drives consistent organic growth, I help businesses tell stories that actually convert.

With hands-on experience across multiple industries — from fashion and coaching to tech and e-commerce — 
I bring both the creative eye and the analytical mindset needed to build a brand that lasts.`,
    skills: [
      "Premiere Pro",
      "DaVinci Resolve",
      "After Effects",
      "Lightroom",
      "SEO Tools",
      "Google Analytics 4",
      "Google Search Console",
      "Meta Ads Manager",
      "React / Next.js",
      "Figma",
    ],
  },

  // ── Testimonials ──────────────────────────────────────────
  testimonials: [
    {
      id: "t1",
      quote:
        "Aditya's grand opening promo reel for Premium Chai Sutta generated massive buzz and footfall right from launch day. Clean frames, energetic pacing, and exceptional visual quality.",
      author: "Founder, Premium Chai Sutta",
      role: "Client",
      isPlaceholder: false,
    },
    {
      id: "t2",
      quote:
        "The commercial ad created for Aarambh Car Decor showcased our premium car accessories and detailing services flawlessly. Highly professional, prompt, and creative.",
      author: "Owner, Aarambh Car Decor",
      role: "Client",
      isPlaceholder: false,
    },
    {
      id: "t3",
      quote:
        "Aditya captured the traditional richness of our Sant Parampara shop with modern cinematic flair. The video resonated deeply with our customers.",
      author: "Owner, Sant Parampara",
      role: "Client",
      isPlaceholder: false,
    },
  ],

  // ── SEO Metadata ──────────────────────────────────────────
  seo: {
    title: "Aditya Khedkar — Cinematic Videographer & Digital Marketer",
    description:
      "Aditya Khedkar is a cinematic videographer and digital marketer helping brands grow through compelling visual storytelling and data-driven SEO strategies.",
    ogImage: "/og-image.jpg",
    twitterHandle: "@adityakhedkar",
  },
} as const;

// ── TypeScript Types ───────────────────────────────────────
export interface MarketingVideo {
  id: string;
  file: string;
  poster?: string;
  title: string;
  brand: string;
  role: string;
  externalUrl?: string;
  instagramUrl?: string;
}

export interface CinematicVideo {
  id: string;
  file: string;
  poster?: string;
  title: string;
  client: string;
  externalUrl?: string;
  instagramUrl?: string;
}

export type SiteConfig = typeof siteConfig;
