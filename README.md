# Habeeb Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 and App Router
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Optimized for performance

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Navigation.tsx # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills section
│   ├── Projects.tsx    # Projects section
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
└── public/             # Static assets
```

## Customization

1. Update your personal information in the components
2. Add your projects in `components/Projects.tsx`
3. Update skills in `components/Skills.tsx`
4. Modify colors and styling in `tailwind.config.ts`
5. Update metadata in `app/layout.tsx`

## Build for Production

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

