# CREATI · Dream Builders

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)](https://creati-web.vercel.app)
[![Made in Mexico](https://img.shields.io/badge/Made_in-México_🇲🇽-orange)](#)

Sitio web oficial de **CREATI**, agencia mexicana de producción integral de eventos: bodas, bodas LGBTQ+, congresos, conciertos, corporativos y experiencias tech.

🌐 **Producción:** https://creati-web.vercel.app
🔧 **Auto-deploy:** cada push a `main` se despliega automáticamente vía Vercel ↔ GitHub

## Stack

Sitio estático ultra-rápido, sin build step:

- HTML5 semántico
- CSS3 puro (variables, grid, container queries, gradientes mesh)
- JavaScript vanilla + GSAP + ScrollTrigger + Lenis (smooth scroll)
- Fuentes: Cabinet Grotesk, Space Grotesk, Instrument Serif (Google Fonts)
- Hospedado en Vercel

## Estructura

```
.
├── index.html       # Página principal
├── styles.css       # Sistema de diseño + animaciones
├── script.js        # Interacciones (cursor, reveals, tabs, contadores)
├── favicon.svg      # Favicon SVG con el logo
├── robots.txt
├── sitemap.xml
└── vercel.json      # Headers de seguridad + caché
```

## Secciones

1. Hero animado con orbes parallax
2. Marquee de servicios
3. Trust strip (hoteles & venues partner)
4. Nosotros · método Dream-to-Delivery™
5. Servicios (6 cards con tilt 3D)
6. Tipos de eventos con tabs (Bodas, LGBTQ+, Corporativo, Tech, Social, Conciertos)
7. Venues premium (hoteles 5★, haciendas, beach clubs, centros de convenciones)
8. Diferenciadores
9. Paquetes Essential / Signature / Iconic
10. Portafolio (grid asimétrico)
11. Proceso Dream-to-Delivery™ (timeline)
12. Tecnología (NFC, robots, AV pro, VR/AR)
13. Testimonios
14. Insights / Blog + Newsletter
15. FAQ
16. CTA + formulario de cotización
17. Footer

## Desarrollo local

```bash
# Cualquier servidor estático funciona:
python3 -m http.server 3000
# o
npx serve .
```

Abre http://localhost:3000

## Deploy

Push a `main` y Vercel lo despliega automáticamente.

```bash
vercel deploy --prod
```

## Brand

| Color   | Hex       |
|---------|-----------|
| Naranja | `#F7931E` |
| Rosa    | `#EC4899` |
| Morado  | `#8B5CF6` |
| Azul    | `#06B6D4` |
| Amarillo| `#FBBF24` |

---

© 2026 CREATI · CDMX · Guadalajara · Monterrey
