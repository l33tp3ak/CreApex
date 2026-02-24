This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.








## Auteur
Alexandre Tardif, 2496651


## Projet de boutique d'impression 3D
https://github.com/l33tp3ak/CreApex
https://creapex-qqqjtqhuc-johndeeeres-projects.vercel.app/


Ce projet est une ébauche de boutique en ligne complète.
Il est en évolution constante et a pour but ultime de d'être déployé afin de vendre des services d'impression 3d aux particuliers et  aux entreprises.


## Technologies
En tant que projet en évolution, les technologies utilisées sont sujet à changement, voici toutefois une liste (non-exhaustive) de certaines technologies principales:

 - Node.JS: "^24.13.0"
 - React.JS: "^19.2.4"
 - Next.JS: "^16.1.6"
 - JsonWebToken (JWT): "^9.0.3"
 - BCryptJS: "^3.0.3"
 - Prisma ORM "^7.4.1"
 - TypeScript: "^5.9.3"
 - cookie: "^1.1.1"
 - "@prisma/adapter-neon": "^7.3.0"
 
 
 ## Étapes d'installation
 npm install
 
 création de fichier ".env"
 
 npm run dev



## Structure du Projet

Si dessous est la structure général du projet, sans node_modules, gracieuseté de CMD tree

├───public
│   ├───images
│   └───uploads
└───src
    ├───actions
    ├───app
    │   ├───(auth)
    │   │   ├───login
    │   │   ├───register
    │   │   └───secondsignup
    │   ├───(protected)
    │   │   └───dashboard
    │   ├───api
    │   │   ├───address
    │   │   ├───addressBook
    │   │   ├───auth
    │   │   │   └───login
    │   │   ├───cart
    │   │   ├───colour
    │   │   ├───country
    │   │   ├───currency
    │   │   ├───invoice
    │   │   ├───language
    │   │   ├───material
    │   │   ├───materialColour
    │   │   ├───modele3D
    │   │   ├───modele3dimages
    │   │   ├───provinceState
    │   │   ├───request
    │   │   ├───task
    │   │   ├───uploadFile
    │   │   ├───user
    │   │   └───workOrder
    │   ├───assets
    │   │   ├───CSS
    │   │   ├───fonts
    │   │   └───images
    │   ├───components
    │   │   └───auth
    │   └───handler
    │       └───[...stack]
    ├───controllers
    ├───generated
    │   └───prisma
    │       ├───internal
    │       └───models
    ├───lib
    ├───middleware
    └───stack



## Variables d'environement:

 - DATABASE_URL
 - JWT_SECRET
 - JWT_EXPIRES_IN
 - NEXT_PUBLIC_STACK_PROJECT_ID
 - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
 - STACK_SECRET_SERVER_KEY
 
 
 