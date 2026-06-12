# Ali Saber — Personal Portfolio

A clean, academic portfolio built with **Next.js 14** (App Router) + **Tailwind CSS**.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Open http://localhost:3000
```

## Customise your content

All placeholder data lives in two files — no other changes needed:

| File | What to edit |
|------|-------------|
| `app/page.jsx` | `PROFILE`, `PUBLICATIONS`, `PROJECTS` objects at the top |
| `app/cv/page.jsx` | `CV_DATA` object at the top |

## Add your photo

1. Place `profile.jpg` in the `/public` folder  
2. In `app/page.jsx` → `HeroSection`, uncomment the `<Image>` tag  
3. Add `import Image from 'next/image'` at the top of the file

## Add project videos / publication thumbnails

Drop files in `/public`:
```
/public/videos/proj1.mp4
/public/pub1.jpg
/public/pub2.jpg
```
Then set the `video` / `img` field in `PROJECTS` / `PUBLICATIONS` to the path  
(e.g., `video: '/videos/proj1.mp4'`).

## Add a real PDF CV

1. Place `Ali-Saber-CV.pdf` in `/public`  
2. In `app/cv/page.jsx`, replace the `handlePrint` function with:
```js
const handlePrint = () => {
  const a = document.createElement('a');
  a.href = '/Ali-Saber-CV.pdf';
  a.download = 'Ali-Saber-CV.pdf';
  a.click();
};
```

## Deploy

```bash
# Build for production
npm run build

# Or push to GitHub and deploy on Vercel (free, recommended)
# https://vercel.com/new
```

## Navigation behaviour

- **Home / Projects / Contact** → smooth-scroll within the home page  
- **CV** → navigates to `/cv` (separate page)  
- On the CV page, clicking Home/Projects/Contact returns to `/#section`  
- Mobile menu collapses automatically after any navigation
