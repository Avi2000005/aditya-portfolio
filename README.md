# Aditya Khedkar Portfolio

A production-quality, config-driven portfolio website built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve production build
```

---

## 📁 Where to Drop Your Files

| File | Location | Notes |
|---|---|---|
| Your photo | `/public/aditya.jpg` | Recommended: ~800×1000px, JPEG/WebP |
| Marketing videos | `/public/adMarketing/marketing1.mp4`, `marketing2.mp4`, … | See below for naming |
| Cinematic reels | `/public/cinematic/cinematic1.mp4`, `cinematic2.mp4`, … | Vertical 9:16 preferred |
| Video posters | Same folder, same name, `.jpg` extension | e.g. `marketing1.jpg` |
| OG image | `/public/og-image.jpg` | 1200×630px, used for social sharing |

> **Alternative paths**: If you place cinematic videos directly in `/public/` (not in `/public/cinematic/`), open `/data/siteConfig.ts` and change:
> ```ts
> cinematicBasePath: "",   // was "/cinematic/"
> ```

---

## ✏️ How to Edit Content

**All content lives in one file: [`/data/siteConfig.ts`](./data/siteConfig.ts)**

You never need to touch any component files. Just edit `siteConfig.ts`:

- **Contact info**: update `contact.phone`, `contact.email`
- **Stats**: update `stats` array values
- **Add a marketing video**: add an object to `marketingVideos`
- **Add a cinematic reel**: add an object to `cinematicVideos`
- **Change accent color**: in `app/globals.css`, change `--color-accent: #C8A25D;` to your color
- **Testimonials**: replace placeholder quotes in `testimonials` array

### Adding a New Marketing Video

```ts
// In /data/siteConfig.ts → marketingVideos array:
{
  id: "mkt5",
  file: "marketing5.mp4",           // drop the file in /public/adMarketing/
  poster: "marketing5.jpg",         // optional: same folder
  title: "Campaign Title",
  brand: "yourbrand.com",
  role: "SEO",
  externalUrl: "",                  // OR set a YouTube/CDN URL here
}
```

### Hosting Videos Externally (Recommended for 1080p/4K)

Instead of serving large videos from `/public`, set `externalUrl` per video:

```ts
externalUrl: "https://cdn.cloudinary.com/your-video.mp4"
// or
externalUrl: "https://your-bunny-cdn.b-cdn.net/video.mp4"
```

---

## 🎬 Video Compression (FFmpeg Commands)

Before uploading, compress your videos to save bandwidth while keeping quality.

### Marketing Videos (16:9, web-optimised)
```bash
ffmpeg -i input.mp4 \
  -vf scale=1280:720 \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output_marketing1.mp4
```

### Cinematic Reels (9:16 vertical, web-optimised)
```bash
ffmpeg -i input.mp4 \
  -vf scale=720:1280 \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output_cinematic1.mp4
```

### Generate Poster Image (first frame)
```bash
ffmpeg -i input.mp4 -vframes 1 -q:v 2 marketing1.jpg
```

### Generate Poster at a Specific Time (e.g., 2 seconds in)
```bash
ffmpeg -ss 00:00:02 -i input.mp4 -vframes 1 -q:v 2 cinematic1.jpg
```

### Batch Convert (PowerShell)
```powershell
Get-ChildItem -Filter "*.mp4" | ForEach-Object {
  ffmpeg -i $_.Name -vf scale=1280:720 -c:v libx264 -crf 23 -preset slow -movflags +faststart "compressed_$($_.Name)"
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com). Zero configuration needed.

> ⚠️ **Important for large videos**: Vercel has a 100MB file size limit on the free plan. For 1080p/4K videos, use an external CDN:
> - [Cloudinary](https://cloudinary.com) — free tier includes 25GB storage + auto-compression
> - [Bunny.net](https://bunny.net) — affordable video CDN
> - [Cloudflare R2](https://cloudflare.com/r2) — S3-compatible, generous free tier
>
> Upload your videos there and set `externalUrl` in `siteConfig.ts` for each video.

### Custom Domain

After deploying to Vercel, set your domain in the Vercel dashboard, then update `siteUrl` in `siteConfig.ts`:

```ts
siteUrl: "https://adityakhedkar.com",
```

### Environment Variables (for email)

To enable the contact form to actually send emails, create a `.env.local` file:

```env
# Uncomment the email service you want to use
# CONTACT_EMAIL_SERVICE=resend
# RESEND_API_KEY=re_...
```

Then update `/app/api/contact/route.ts` with your mailer code (instructions are in the file).

---

## 🏗️ Project Structure

```
/
├── app/
│   ├── api/contact/route.ts    # Contact form API
│   ├── globals.css             # Design tokens + Tailwind v4
│   ├── layout.tsx              # Root layout, fonts, SEO, JSON-LD
│   ├── page.tsx                # Main page assembly
│   ├── sitemap.ts              # Auto-generates sitemap.xml
│   └── robots.ts               # Auto-generates robots.txt
├── components/
│   ├── sections/               # Page sections (Hero, Work, etc.)
│   ├── ui/                     # Reusable UI components
│   ├── LazyVideo.tsx           # The video engine (IntersectionObserver)
│   ├── Lightbox.tsx            # Accessible modal video player
│   ├── VideoManager.tsx        # Global single-play video manager
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── data/
│   └── siteConfig.ts           # ← EDIT THIS FILE for all content
├── lib/
│   └── utils.ts                # className utility
└── public/
    ├── aditya.jpg              # ← Your photo goes here
    ├── adMarketing/            # ← Marketing videos
    └── cinematic/              # ← Cinematic reels
```

---

## 🎨 Changing the Accent Color

Open `app/globals.css` and change one line:

```css
--color-accent: #C8A25D;  /* warm gold — change this */
--color-accent-light: #F0E3C8;  /* lighter tint — change this too */
```

Options:
- Muted indigo: `#4F5BD5` + `#E8EAFA`
- Deep teal: `#0D9488` + `#CCFBF1`
- Charcoal: `#374151` + `#E5E7EB`
