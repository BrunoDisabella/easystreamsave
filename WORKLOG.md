# Worklog - Easy Stream Save

## 2026-06-19

- Bruno compro `easystreamsave.com` en Hostinger.
- Bruno creo la cuenta `easystreamsave@gmail.com`.
- Se decidio usar Cloudflare como DNS principal y Hostinger solo como registrador.
- Cloudflare asigno nameservers:
  - `brenda.ns.cloudflare.com`
  - `elijah.ns.cloudflare.com`
- Bruno cambio nameservers en Hostinger.
- Se creo roadmap vivo del proyecto.
- Se definio que el proyecto tendra agente/cron autonomo para avanzar tareas que no requieran intervencion externa.
- Se creo cron OpenClaw `Easy Stream Save roadmap agent`.
  - ID: `ecdbe371-7b49-4b34-b466-073231d5c8b5`
  - Horario inicial: todos los dias 09:30 America/Montevideo.
  - Modo: sesion aislada, entrega resumen por Telegram a Bruno.
  - Objetivo: avanzar una unidad concreta del roadmap, actualizar archivos y pedir ayuda solo ante bloqueos externos.
- Bruno pidio transformar el roadmap en herramienta profesional: KPIs, metricas, SEO, captacion, branding, procesos y monetizacion.
- Se actualizo el cron para correr cada hora entre 04:00 y 07:00 America/Montevideo.
- Bruno confirmo que Cloudflare dio OK del dominio.
- Bruno pidio que el cron tenga criterios de avance por area: SEO, KPIs, pricing, branding, captacion, landing, producto y medicion.
- Se creo `SEO_AND_GROWTH.md` con keywords long-tail, experimentos, cadencias, KPIs y estrategia para busqueda/LLM.
- Se creo `COMPETITOR_PRICING.md` con modelos de negocio y recomendacion de pricing.
- Se verifico Git:
  - `gh` no esta instalado.
  - Acceso publico HTTPS a GitHub funciona.
  - SSH a GitHub falla por host key no verificada.

Ultimo estado conocido:
Cloudflare activo. Scaffold local creado.

Archivos creados:

- `README.md`
- `landing/index.html`
- `landing/privacy.html`
- `landing/terms.html`
- `landing/why-some-videos-cannot-be-downloaded.html`
- `landing/styles.css`
- `landing/robots.txt`
- `landing/sitemap.xml`
- `landing/assets/logo.svg`
- `landing/assets/favicon.svg`
- `extension/manifest.json`
- `extension/service-worker.js`
- `extension/popup.html`
- `extension/popup.css`
- `extension/popup.js`
- `extension/icons/icon-16.svg`
- `extension/icons/icon-32.svg`
- `extension/icons/icon-48.svg`
- `extension/icons/icon-128.svg`

Validacion:

- Manifest JSON valido.
- Landing local respondio HTTP 200 en `/` y `/privacy.html`.

Proximo:
Revisar extension cargada manualmente en Chrome y preparar deploy de landing en Cloudflare Pages/Vercel.

2026-06-19 03:11 UYT
- Se inicializo git local independiente en el proyecto.
- Se subio commit inicial a GitHub `BrunoDisabella/easystreamsave`, rama `main`, commit `485b625`.
- Cloudflare Pages ya deberia poder seleccionar `main` como rama de produccion.

2026-06-19 03:22 UYT
- Cloudflare Pages quedo desplegado en `https://easystreamsave.pages.dev`.
- Dominio root `https://easystreamsave.com` respondio OK con la landing.
- `https://www.easystreamsave.com` no quedo resuelto: seguia apuntando a Hostinger (`2.57.91.93`) en vez de Cloudflare Pages.
- Accion pendiente para retomar:
  - En Cloudflare DNS, reemplazar/eliminar registro viejo de `www` y dejar CNAME `www -> easystreamsave.pages.dev` con proxy activado.
  - Revisar/verificar email ICANN del dominio en Hostinger si aparece alerta de suspension.
- Bruno pidio pausar este punto y dejarlo pendiente en roadmap para seguir con otra cosa.

2026-06-19 03:24 UYT
- Se avanzo el siguiente punto desbloqueado: preparacion de pruebas locales de la extension.
- Se agrego deteccion por `Content-Type` en `extension/service-worker.js` para medios sin extension visible en la URL.
- Se creo `MANUAL_TEST_PLAN.md` con matriz de pruebas, fuentes seguras, criterios de aceptacion y formato de bug log.
- Se actualizo `README.md` para apuntar al plan de QA.
- Se actualizo `ROADMAP.md` marcando como listo el plan de QA y la deteccion por headers.

2026-06-19 03:27 UYT
- Se empaqueto la extension como `easy-stream-save-extension-0.1.0.zip`.
- Se valido que el ZIP tenga `manifest.json` en la raiz.
- Se envio el ZIP a Bruno por Telegram como documento para prueba manual en Chrome.

2026-06-19 03:38 UYT
- Bruno confirmo prueba real OK: la extension descargo un video de TikTok.
- Se tomo como referencia competitiva el popup con preview de video.
- Se mejoro el MVP:
  - Popup con preview visual para archivos directos MP4/WebM/MOV/M4V.
  - Fallback visual para streams HLS/MPD y audio.
  - Tamano visible cuando el servidor envia `Content-Length`.
  - Aviso claro sobre limite YouTube/DRM.
  - Description de extension mas orientada a produccion.
  - Landing actualizada a posicionamiento production MVP con foco en preview, privacidad y limites honestos.
  - Logo/favicons/iconos de extension reemplazados por marca propia play + download.
- Validacion:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.

2026-06-19 03:51 UYT
- Bruno pidio orientar monetizacion a suscripcion barata USD 1.99/mes, Free limitado, investigar competencia, trafico no solo SEO, videos tutoriales IA, multilenguaje ingles/espanol y programa para entender que valoran los usuarios.
- Capturas de Bruno mostraron bugs reales:
  - Chrome no mostraba bien el logo en `chrome://extensions`/toolbar.
  - La preview quedaba como placeholder `VID` y no renderizaba video real.
- Correcciones de producto:
  - Iconos de extension convertidos a PNG y referenciados en `manifest.json` como `icons` y `action.default_icon`.
  - Popup usa PNG del icono.
  - Deteccion de tipo ahora infiere MP4/WEBM/MOV/M3U8/MPD desde `Content-Type` cuando la URL no trae extension.
  - Preview intenta renderizar videos detectados por `Content-Type`, no solo por extension visible.
  - Se agrego limite Free local de 5 descargas/dia con `chrome.storage.local`; deteccion/preview siguen gratis.
- Documentacion agregada:
  - `MONETIZATION_AND_PAYMENTS.md`
  - `COMPETITOR_RESEARCH.md`
  - `TRAFFIC_AND_CONTENT.md`
- Roadmap actualizado con Paddle vs Stripe, Free/Pro, multilenguaje, videos IA, investigacion de reviews y mejoras de preview/icono.
