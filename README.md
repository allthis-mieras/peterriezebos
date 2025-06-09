# Peter Riezebos Artist Website

Een moderne website voor kunstenaar Peter Riezebos, gebouwd met moderne web technologieën.

## Technologieën

- Vite
- GSAP
- Lenis
- Utopia
- SCSS

## Installatie

1. Clone de repository
2. Installeer dependencies:
```bash
npm install
```

## Ontwikkeling

Start de development server:
```bash
npm run dev
```

## Build

Build de productie versie:
```bash
npm run build
```

Preview de productie build:
```bash
npm run preview
```

## Project Structuur

```
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── lenis.js
│   │   │   ├── hero.js
│   │   │   ├── about.js
│   │   │   └── projects.js
│   │   └── main.js
│   └── styles/
│       ├── base/
│       │   ├── _reset.scss
│       │   ├── _variables.scss
│       │   └── _typography.scss
│       ├── components/
│       │   ├── _hero.scss
│       │   ├── _about.scss
│       │   ├── _projects.scss
│       │   ├── _social.scss
│       │   └── _marquee.scss
│       └── main.scss
├── index.html
├── package.json
├── vite.config.js
└── README.md
``` 