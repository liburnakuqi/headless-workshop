# Headless CMS Workshop using Next.js, Sanity and Vercel<!-- omit in toc -->

This is a starter repo used as a part of the Headless CMS Workshop. It walks through the steps needed to build out a statically generated website that uses [Next.js](https://nextjs.org/) for the frontend, [Sanity](https://www.sanity.io/) to handle its content and [Vercel](https://vercel.com/) to deploy to production.

Access the workshop presentation [here](https://docs.google.com/presentation/d/1L_wW6yrLEmNiVBJEPtweJorlA7yYOjbNUX4Tc9KGA6w/edit?usp=sharing), which will guide you through the steps to build out your own site! You can find the completed example by checking out the `complete-example` branch.

## Topics

- Intro

  - What is headless architecture?
  - What is Next.js?
  - What is Sanity.io?

- Setting up the Repo
- Setting up Sanity.io
  - Content modeling
  - Querying content with GROQ
- Setting up Next.js
  - Dynamic routing
  - Fetching page data
  - Page builder
- Deploying to production on Vercel

## Running the project locally

### Prerequisites

- Node.js 18+
- npm 9+

### Environment variables

Use `.env.local.example` as a reference and create a local `.env.local` file with the required values.

### Install dependencies

```bash
npm install
```

### Next.js app + embedded Sanity Studio

Start the development environment:

```bash
npm run dev
```

- Website: http://localhost:3000
- Studio: http://localhost:3000/studio

### Storybook

[Storybook](https://storybook.js.org/) contains all prebuilt components used by the site. To run it locally:

```bash
npm run storybook
```

Navigate to http://localhost:6006.

### Useful scripts

- `npm run lint` – run ESLint checks
- `npm run type-check` – run TypeScript checks
- `npm run build` – build for production
- `npm run start` – run the production build

## Additional documentation

- [Library architecture](lib/README.md)
- [Architecture notes](docs/ARCHITECTURE_NOTES.md)


