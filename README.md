# ArticleHub

ArticleHub is a responsive article publishing application developed for the Development Platforms Course Assignment at Noroff.

The project uses React for the frontend and Supabase for authentication and database management.

## Live Demo

The application is deployed using Vercel.

**Live Website:** https://development-platforms-ca.vercel.app/

**GitHub Repository:** https://github.com/ND-Nitro/development-platforms-ca

## Features

- Browse published articles without logging in.
- Register a new account using email and password.
- Confirm email address before logging in.
- Log in and log out.
- Create articles when authenticated.
- Protect article creation using Supabase Row Level Security (RLS).
- Responsive layout for desktop and mobile.
- Loading, success, and error messages.

## Technologies

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Supabase
- Git and GitHub
- Vercel

## Installation

Clone the repository:

```bash
git clone https://github.com/ND-Nitro/development-platforms-ca.git
```

Navigate to the project:

```bash
cd development-platforms-ca
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root directory.

Add the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_public_anon_key
```

The values can be found in the Supabase project dashboard.

The `.env.local` file is excluded from Git.

The Supabase public anon key is intended for frontend use. Database permissions are enforced using Row Level Security.

Never use a Supabase service role key in frontend code.

## Supabase Configuration

The application requires a Supabase project with email authentication enabled.

### Database

Create a table named `articles` with the following columns:

| Column       | Type        | Description                    |
| ------------ | ----------- | ------------------------------ |
| id           | int8        | Primary key                    |
| created_at   | timestamptz | Article creation date          |
| title        | text        | Article title                  |
| body         | text        | Article content                |
| category     | text        | Article category               |
| submitted_by | uuid        | ID of the authenticated author |

The `id` column should be automatically generated, and `created_at` should default to the current timestamp.

### Row Level Security

Enable RLS on the `articles` table.

The application requires two policies:

- Anonymous and authenticated users can read articles.
- Authenticated users can insert articles only when `submitted_by` matches their authenticated user ID.

Example SQL:

```sql
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read articles"
ON public.articles
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can create articles"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = submitted_by);
```

Run these policies only when setting up a new database where they do not already exist.

## Running the Project

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Production Build

Build the application:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

## Deployment

The application is configured for deployment using Vercel.

The following environment variables must be configured in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Both variables must be available in the Production environment.

The Supabase Authentication URL Configuration must also include the deployed application URL for email confirmation redirects.

## Security

Supabase Row Level Security is used to protect database operations.

Testing confirmed that:

- Published articles can be viewed without authentication.
- Authenticated users can create articles.
- Anonymous users cannot insert articles.
- The article creation page is protected in the frontend.

Frontend route protection is used for the user experience, while database security is enforced through RLS.

## AI Usage

AI tools were used as supporting resources during development, including guidance on project setup, debugging, code examples, and learning new technologies.

AI-assisted suggestions were reviewed and tested during the development process.

A more detailed description is available in [AI_LOG.md](AI_LOG.md).

## Author

Steffen Heltne

Noroff – Frontend Development
