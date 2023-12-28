This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First to get started clone the repository:

```bash
 git clone https://github.com/getoarmorina3/nextjs-blog.git
```

and copy these .env.example variables into a separate .env file:
```bash

# This file contains all the environment variables required for the application to run

# The URL of your Next.js application (optionally) recommended to use localhost for development
NEXT_PUBLIC_SERVER_URL=

# DATABASE_URL: Prisma connection to the database
DATABASE_URL= 

# GOOGLE_CLIENT_ID: Client ID for Google OAuth
GOOGLE_CLIENT_ID= 

# GOOGLE_CLIENT_SECRET: Client Secret for Google OAuth
GOOGLE_CLIENT_SECRET= 

# NEXTAUTH_URL: The URL of your Next.js application for authentication
NEXTAUTH_URL= 

# NEXTAUTH_SECRET: Secret key for NextAuth.js (used for session encryption)
NEXTAUTH_SECRET= 

# UploadThing API Secret for uploading files you can get it from https://uploadthing.com/
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

on your terminal finally start the development server
```bash
# To install dependencies, run
npm install

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

# To build the app, use (recommended good for debugging)
npm run build

# To run the app, use
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
