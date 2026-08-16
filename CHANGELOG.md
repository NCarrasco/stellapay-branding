# Bitácora de cambios

## 2026-08-16 — Línea base

- Se crea el repositorio independiente del branding.
- Se excluyen dependencias, cachés, archivos del sistema y resultados de build.
- Se documentan dominios, responsabilidad del sitio y flujo Git.
- Estado recibido: sitio estático con página principal y una página de acceso que
  aparenta capturar credenciales, enlaces todavía no alineados con las rutas del
  aplicativo, lenguaje técnico y diferencias frente a los planes del backend.
- No se ha publicado ni modificado DNS.

## 2026-08-16 — Alineación con onboarding y planes

- Se reemplazan los CTA internos por las rutas reales del aplicativo:
  `/login` para clientes y `/login/registro` para crear el negocio de prueba.
- Se elimina el formulario estático que aparentaba recibir correo y contraseña.
  La página `/login` ahora explica el cambio de dominio y dirige al acceso seguro.
- Se documenta el proceso de prueba: solicitud, correo de 24 horas, confirmación,
  creación del negocio e inicio de sesión manual.
- Se añade una sección de preguntas frecuentes sobre tarjeta, vigencia, reenvío,
  confirmación pendiente, diferencias de planes y dominio seguro.
- Se corrige Bronze de USD 45 a USD 35.
- Se eliminan el soporte prioritario de Silver y otras afirmaciones que no
  coinciden con el backend.
- Se alinean precios, límites y funciones principales de Bronze, Silver y Gold.
- Se sustituyen “Gatekeeper”, “Bento Grid”, “KPI”, “Live Business Board” y otras
  expresiones técnicas por lenguaje cotidiano.
- Se retiran cifras demostrativas de velocidad, cobros y errores que no tenían
  una fuente verificable.
- Se corrige el nombre interno del paquete a `stellapay-branding-page`.
- Se regenera `assets/css/tailwind.css` con Tailwind y Node 20.20.0; la tarea
  termina correctamente y solo conserva el aviso de datos desactualizados de
  Browserslist.
- Se comprueban en navegador local la portada y `/login` en vistas de escritorio
  y móvil: contenido visible, navegación adaptable, rutas correctas y cero
  errores o advertencias de consola.
- Se verifica que `/login` no contiene formularios ni procesa credenciales.
- Pendiente de marca: el repositorio no incluye un favicon aprobado. El navegador
  solicita `/favicon.ico` y recibe 404; no se crea uno nuevo para evitar inventar
  un recurso visual sin aprobación.
