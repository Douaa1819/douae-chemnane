# Douaa Chemnane Portfolio

Premium multilingual personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Tech

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- React Toastify

## Run locally

```bash
npm install
npm run dev
```

## Editable content

Update all portfolio text/data from:

- `utils/data/portfolio-content.js`

## Environment

For correct Open Graph URLs, `robots.txt`, and `sitemap.xml` on production, set:

- `NEXT_PUBLIC_APP_URL` — full site origin (for example `https://your-domain.vercel.app`)

## Contact form config

Set at least one delivery channel in `.env.local`:

- Email: `EMAIL_ADDRESS` and `GMAIL_PASSKEY`
- Telegram: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

If neither is configured, API returns a setup warning.
