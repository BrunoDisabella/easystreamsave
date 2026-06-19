# Roadmap - Easy Stream Save

Ultima actualizacion: 2026-06-19
Objetivo principal: monetizar una extension Chrome limpia para descarga/deteccion de videos web, empezando por mercado ingles.

## Reglas de Ejecucion

- Todo avance importante debe actualizar `BUSINESS_PLAN.md`.
- Toda sesion de trabajo debe agregar entrada en `WORKLOG.md`.
- Monetizacion y pagos viven en `MONETIZATION_AND_PAYMENTS.md`.
- Investigacion de competencia vive en `COMPETITOR_RESEARCH.md`.
- Trafico, contenido y multilenguaje viven en `TRAFFIC_AND_CONTENT.md`.
- El agente autonomo debe leer `AGENT_BRIEF.md`, `ROADMAP.md`, `WORKLOG.md` y `BUSINESS_PLAN.md` antes de trabajar.
- El roadmap debe evolucionar con objetivos medibles, KPIs, SEO, captacion, branding, procesos y monetizacion.
- Cada iniciativa importante debe tener criterio de exito, ventana minima de medicion y decision posterior.
- No ejecutar acciones externas que requieran cuenta, pago, publicacion, envio de emails o cambios DNS sin confirmacion de Bruno.
- Si una tarea queda bloqueada por acceso, pago, cuenta, decision de producto o captura visual, avisar a Bruno con pedido concreto.
- Mantener promesa honesta: no DRM bypass, no YouTube universal, no evasion de restricciones.

## Fase 0 - Base del Proyecto

Estado: en curso.

Tareas:

- [x] Definir marca operativa: Easy Stream Save.
- [x] Comprar dominio: `easystreamsave.com`.
- [x] Crear cuenta Google: `easystreamsave@gmail.com`.
- [x] Elegir DNS: Cloudflare.
- [x] Configurar nameservers Cloudflare en Hostinger.
- [x] Confirmar activacion de Cloudflare y propagacion DNS.
- [x] Crear cron/agente autonomo diario para avance del roadmap.
- [x] Crear repositorio local del proyecto.
- [x] Crear estructura base: extension, landing, docs.
- [x] Crear logo/favicons iniciales.

## Fase 1 - Landing y Legal Minimo

Estado: produccion MVP desplegable, con `www` pendiente.

Objetivo:
Tener `easystreamsave.com` listo para validar marca, SEO inicial y futuras politicas de Chrome Web Store.

Tareas:

- [x] Home en ingles.
- [x] Privacy Policy.
- [x] Terms / Disclaimer.
- [x] Pagina "Why some videos cannot be downloaded".
- [x] Sitemap.
- [x] Robots.txt.
- [x] Deploy en Cloudflare Pages.
- [x] Conectar dominio root `easystreamsave.com`.
- [x] Mejorar landing a MVP de produccion con foco en preview, privacidad, limites reales y marca consistente.
- [x] Actualizar logo/favicons.
- [ ] Crear landing `/es/`.
- [ ] Agregar `hreflang` ingles/espanol cuando `/es/` exista.
- [ ] Resolver `www.easystreamsave.com`: reemplazar registro viejo de Hostinger por CNAME a `easystreamsave.pages.dev`.
- [ ] Completar/verificar estado ICANN/email del dominio en Hostinger para evitar suspension futura.
- [ ] Preparar verificacion Search Console.

## Fase 2 - Extension MVP Local

Estado: MVP local funcional, pendiente QA amplio.

Objetivo:
Tener una extension MV3 instalada manualmente que detecte medios reales en paginas no DRM.

Tareas:

- [x] Manifest V3.
- [x] Service worker.
- [x] Permisos minimos: `downloads`, `storage`, `tabs`, `webRequest` donde aplique.
- [x] Deteccion MP4/WebM/M3U8/MPD.
- [x] Estado por pestana.
- [x] Badge con cantidad detectada.
- [x] Popup limpio en ingles.
- [x] Descarga directa con `chrome.downloads`.
- [x] Boton limpiar lista.
- [x] Manejo basico de duplicados.
- [x] Deteccion por `Content-Type` para medios sin extension visible.
- [x] Preview visual para archivos directos MP4/WebM/MOV/M4V cuando Chrome permite cargar metadata.
- [x] Corregir preview para videos detectados por `Content-Type` aunque la URL no tenga extension visible.
- [x] Mostrar tamano cuando el servidor informa `Content-Length`.
- [x] Branding/icono de extension actualizado.
- [x] Cambiar iconos de extension a PNG para toolbar/chrome://extensions.
- [x] Mensaje claro sobre limite YouTube/DRM en popup.
- [x] Plan de QA manual para Chrome.
- [ ] Tests manuales en 10-20 sitios no DRM.
- [ ] Agregar boton "Open source URL" o "Preview in new tab" para diagnostico.

## Fase 3 - Publicacion Chrome Web Store

Estado: pendiente.

Objetivo:
Publicar una primera version honesta y estable.

Tareas:

- [ ] Pagar Chrome Web Store Developer fee, USD 5 unico.
- [ ] Preparar descripcion corta y larga.
- [ ] Preparar screenshots.
- [ ] Completar privacy questionnaire.
- [ ] Subir extension.
- [ ] Responder revisiones si Chrome pide cambios.

## Fase 4 - SEO y Crecimiento

Estado: pendiente.

Objetivo:
Captar trafico organico con paginas en ingles.

Tareas:

- [ ] Search Console.
- [x] Sistema de experimentos SEO/crecimiento.
- [ ] Articulo "Cococut alternative without ads".
- [ ] Articulo "Chrome video downloader without ads".
- [ ] Articulo "HLS and M3U8 downloader for Chrome".
- [ ] Articulo "Download web videos privately".
- [ ] Crear landing en espanol: "descargar videos de paginas web".
- [ ] Crear 3 videos tutoriales IA: Chrome web video, TikTok/web source, por que algunos videos no se pueden descargar.
- [ ] Investigar reviews de Chrome Web Store para detectar que valoran/odian los usuarios.
- [ ] Medir impresiones/clicks.
- [ ] Ajustar copy de Chrome Store con queries reales.

KPIs iniciales:

- Primer objetivo: indexar dominio y 3 paginas SEO.
- Primer objetivo Chrome Store: 100 installs organicas.
- Activacion: 30% de usuarios con al menos 1 video detectado.
- Retencion: 20% de usuarios activos despues de 7 dias.
- Conversion Pro futura: 1%-3% de usuarios activos.
- SEO: primeras 100 impresiones en Search Console.

## Fase 5 - Monetizacion

Estado: pendiente.

Objetivo:
Convertir usuarios Free a Pro sin arruinar confianza.

Tareas:

- [ ] Definir feature gates Pro.
- [x] Validar pricing inicial con competencia.
- [x] Definir hipotesis MVP: Free limitado + Pro Starter USD 1.99/mes.
- [ ] Validar Paddle vs Stripe como plataforma de pago optima.
- [ ] Implementar limite Free: 5 descargas/dia o 25/semana, sin bloquear preview/deteccion.
- [ ] Implementar pantalla Pro local al alcanzar limite.
- [ ] Implementar licencia simple.
- [ ] Early adopter lifetime USD 19.
- [ ] Precio normal lifetime USD 29-39.
- [ ] Evaluar suscripcion solo si hay features cloud/costos recurrentes.

## Fase 6 - Procesos Profesionales

Estado: en curso.

Objetivo:
Evitar trabajo reactivo. Cada area debe tener cadencia, metricas y criterios de decision.

Tareas:

- [x] Crear sistema de experimentos SEO/growth.
- [x] Crear archivo de pricing/competencia.
- [ ] Crear backlog priorizado por impacto/esfuerzo.
- [ ] Crear tablero de metricas inicial.
- [ ] Definir eventos de activacion sin tracking invasivo.
- [ ] Crear rutina quincenal de investigacion de reviews/competencia.

## Proxima Tarea Recomendada

Pausado por Bruno: no seguir ahora con dominio/Cloudflare.

Estado a retomar:

- `https://easystreamsave.com` abre la landing en Cloudflare Pages.
- `https://www.easystreamsave.com` seguia apuntando a Hostinger (`2.57.91.93`) por registro DNS viejo.
- Pendiente en Cloudflare DNS: dejar `www` como CNAME hacia `easystreamsave.pages.dev`, proxy activado.
- Pendiente en Hostinger: verificar email ICANN/registrante si aparece alerta de suspension.

Mientras eso queda pausado, la proxima tarea interna recomendada es probar el nuevo MVP con preview en Chrome, anotar sitios donde el preview no cargue por CORS/headers y preparar screenshots para Chrome Web Store.
