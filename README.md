
# GAN Integrity
The gen-city-explorer project employs a modern and robust technology stack designed for scalable, full-stack web applications. Here's a breakdown of the tech components and their roles:

# What tech used:
Core Frameworks and Libraries:
Next.js (v14.2.4): This React-based framework is at the heart of the project, enabling server-side rendering, static site generation, and a seamless developer experience.
React (v18.3.1) & React DOM (v18.3.1): Used for building dynamic, component-based user interfaces.

# Server and Data Handling:
Axios (v1.7.7): Used for making HTTP requests, providing a promise-based HTTP client.

All the routes are in `/api/city`

Files worked on:

- `Page.tsx` - Interface GUI with tailwindcss

- API ENDPOINT: 
    - `app/api/city`
    - `app/api/city/by-tag`
    - `app/api/city/distance`
    - `app/api/city/all-cities`
    - `app/api/city/area`
    - `app/api/city/area-result/[id]`

- `utils/data`
- `utils/api.ts`
- `utils/types.ts`
- `utils/mixins.ts`

# Further imporovements:
- More speration of concern
- Refactor make each end point `api.ts` for sperate testing
- Make the GUI more intuative
