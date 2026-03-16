# Coding Fantasy Chronicle

Landing website for the Coding Fantasy mobile game. This web app presents the game's fantasy-themed learning experience, shows in-game screenshots, and provides legal/account-management pages for players.

## What is in this web app

- Home page with hero section, feature highlights, and screenshot gallery.
- Privacy Policy page.
- Delete Account page that signs users in with Supabase Auth and invokes the `delete-user-account` Edge Function.

## Tech stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase JavaScript client

## Routes

- `/` - marketing landing page
- `/privacy-policy` - privacy policy content
- `/delete-account` - account deletion flow for existing users

## Local development

Requirements:

- Node.js 18+ recommended
- npm

Install and run:

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Environment variables

Create a local `.env` file with:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

Notes:

- Do not commit `.env`.
- Supabase functions and backend migrations are managed from the `coding-fantasy-mobile` repository.
- This web project only needs the public client variables so it can authenticate users and call deployed Supabase functions.

## Assets

- Main branding logo: `src/assets/logo.png`
- Landing page screenshots: `src/assets/screenshots/`

## Testing

Run unit tests with:

```sh
npm run test
```

Run lint checks with:

```sh
npm run lint
```
