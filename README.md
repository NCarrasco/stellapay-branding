# StellaPay Branding Page

Sitio comercial público de StellaPay POS para `https://stellapaypos.com`.
Presenta el producto, sus capacidades y planes, y dirige al aplicativo alojado
en `https://app.stellapaypos.com`.

## Integración con el aplicativo

- Acceso de clientes: `https://app.stellapaypos.com/login`.
- Crear un negocio de prueba: `https://app.stellapaypos.com/login/registro`.
- La verificación de correo y la creación del negocio pertenecen al aplicativo,
  no a este sitio estático.
- Los precios, límites y prestaciones deben validarse contra el backend de
  StellaPay POS antes de publicarse.
- La duración predeterminada de la prueba se obtiene de `TRIAL_DAYS`; la página
  puede explicar el valor vigente, pero el aplicativo es la fuente definitiva.

## Desarrollo

Requisito: Node.js 20.

```bash
npm ci
npm run build:css
```

El sitio no contiene un backend ni debe capturar credenciales. Los formularios de
acceso y registro siempre se atienden en el aplicativo.

## Criterios de contenido

- Usar lenguaje cotidiano para propietarios y administradores de negocios en
  República Dominicana.
- Explicar siglas la primera vez que aparezcan.
- No publicar métricas de rendimiento, seguridad o disponibilidad sin evidencia.
- No anunciar funciones, límites, precios ni niveles de soporte diferentes a los
  definidos por el aplicativo.

## Flujo Git

- `main`: versión publicable.
- `develop`: integración previa a publicación.
- `feature/*`: cambios de contenido o funcionalidad.
- Todo cambio debe registrarse en `CHANGELOG.md` y validarse antes de integrarse.
- No se publica directamente desde una rama `feature/*`.

## Archivos principales

- `index.html`: página comercial.
- `login/index.html`: transición hacia el acceso seguro del aplicativo.
- `assets/css/tailwind-input.css`: entrada de Tailwind.
- `assets/css/site.css`: comportamientos visuales adicionales.
- `assets/js/site.js`: animaciones y navegación del sitio.
