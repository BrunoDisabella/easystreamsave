# Roadmap - Easy Stream Save

Ultima actualizacion: 2026-06-19
Objetivo principal: monetizar una extension Chrome limpia para descarga/deteccion de videos web, empezando por mercado ingles.

## Reglas de Ejecucion

- Todo avance importante debe actualizar `BUSINESS_PLAN.md`.
- Toda sesion de trabajo debe agregar entrada en `WORKLOG.md`.
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

Estado: pendiente.

Objetivo:
Tener `easystreamsave.com` listo para validar marca, SEO inicial y futuras politicas de Chrome Web Store.

Tareas:

- [x] Home en ingles.
- [x] Privacy Policy.
- [x] Terms / Disclaimer.
- [x] Pagina "Why some videos cannot be downloaded".
- [x] Sitemap.
- [x] Robots.txt.
- [ ] Deploy en Cloudflare Pages o Vercel.
- [ ] Conectar dominio root y `www`.
- [ ] Preparar verificacion Search Console.

## Fase 2 - Extension MVP Local

Estado: pendiente.

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
- [ ] Tests manuales en 10-20 sitios no DRM.

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

## Proxima Tarea Recomendada

Scaffold local creado. Proxima tarea: revisar extension cargada manualmente en Chrome y preparar deploy de landing en Cloudflare Pages/Vercel.
