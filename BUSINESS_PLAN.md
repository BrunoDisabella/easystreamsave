# Business Plan - Video Downloader Extension

Ultima actualizacion: 2026-06-19
Estado: dominio comprado, cuenta Google creada, Cloudflare activo, scaffold local creado

## Regla Operativa

Este documento se actualiza activamente a medida que avanza el proyecto. Cada decision importante de producto, marca, pricing, SEO, desarrollo o distribucion debe quedar reflejada aca.

El proyecto tambien mantiene:

- `ROADMAP.md`: mapa de fases, tareas y prioridades.
- `WORKLOG.md`: bitacora cronologica de avances.
- `AGENT_BRIEF.md`: instrucciones para el agente/cron autonomo.
- `SEO_AND_GROWTH.md`: sistema de keywords, experimentos, KPIs, cadencias y captacion.
- `COMPETITOR_PRICING.md`: pricing, modelos de negocio y competencia.

El roadmap debe mantenerse como herramienta profesional: objetivos medibles, KPIs, SEO, captacion, branding, procesos y monetizacion.

## Resumen

Crear una extension Chrome en ingles, con marca separada de Bruno/Los Gurises, para detectar y descargar videos/streams disponibles en la pagina actual. El diferencial sera una experiencia limpia, sin ads invasivos, privacidad clara y promesas honestas.

## Mercado

El mercado correcto inicial es global e ingles:

- mayor volumen SEO;
- mayor volumen Chrome Web Store;
- usuarios mas acostumbrados a pagar por extensiones;
- keywords de compra claras: Chrome video downloader, HLS downloader, M3U8 downloader, Cococut alternative, video downloader without ads.

Espanol queda como localizacion futura, no prioridad del MVP.

## Competencia

Competidores principales:

- CocoCut: fuerte en HLS/M3U8 y deteccion, pero con anuncios/UX cargada.
- FetchV: fuerte en HLS/M3U8.
- Video DownloadHelper: marca conocida, amplia compatibilidad, UX mas pesada.
- Stream Recorder: fuerte para guardar HLS.
- HLS Downloader: mas tecnico.
- Video Downloader Professional/Pro: generalista, con modelos premium.

Oportunidad:

- construir confianza;
- explicar limites sin esconderlos;
- UI mas profesional;
- no meter anuncios dentro de la extension;
- convertir con features Pro reales.

## Nombre y Marca

ClipVault fue descartado como primera opcion porque `clipvault.app` y `clipvault.com` estan en uso.

Nombre/Dominio final:

- Marca operativa inicial: Easy Stream Save
- Dominio comprado por Bruno: `easystreamsave.com`
- Cuenta Google operativa creada por Bruno: `easystreamsave@gmail.com`
- Idioma principal: ingles
- Marca separada de Bruno/Los Gurises

Razonamiento:

- Es claro para el usuario: easy + stream + save.
- Tiene keywords naturales para Chrome Web Store y SEO.
- Es menos premium que ClipVault/ClipHarbor, pero mas directo para captacion.
- Permite posicionar rapido: "save web streams easily", "easy HLS/M3U8 downloader".

Nombres descartados o con friccion:

- ClipVault: dominios clave ocupados.
- SaveClip: ya existe extension y dominio `saveclip.app`.
- ClipNest: ya hay apps/productos bajo ese nombre.
- VidVault: ya hay apps con ese nombre.
- VidDock: dominio premium caro listado alrededor de USD 1.995.
- MediaDock: tiene antecedentes de marca/uso historico; evitar si hay alternativas mejores.

Nombres nuevos para validar:

- StreamHold
- ClipHarbor
- MediaHarbor
- StreamCrate
- VideoCrate
- ClipDock
- MediaNest
- StreamPocket
- VideoPocket
- ClipSilo
- FetchClip
- ClipPilot
- Easy Video / EasyVideo

Favoritos anteriores:

1. ClipHarbor: comunica guardar/puerto seguro, suena amigable y global.
2. StreamHold: claro para streams, facil de entender.
3. ClipPilot: mas app/tool, buen potencial visual.
4. VideoCrate: directo, pero menos premium.

Evaluacion 2026-06-19 de Easy Video:

- Bruno propuso `Easy Video` o una derivada.
- Opinion: comunica simpleza y ayuda para SEO, pero como marca exacta es demasiado generica.
- Problemas encontrados: ya existen productos/extensiones/apps con nombres como `Easy Video Downloader`, `EasyVideo`, `EasyVid` y variantes.
- Riesgo: dificil defender marca, dificil rankear por nombre propio, dominios buenos probablemente ocupados/caros, confusion con productos existentes.
- Decision: no usar `Easy Video` literal. Si se usa la idea, crear derivada mas distintiva.

Derivadas mejores:

- EasyStream
- EasyClipper
- EasySave Video
- EasyVidSave
- EasyMediaSave
- EasyStreamSave
- SimpleStream
- SimpleClip
- ClipEasy
- StreamEasy

Favoritas de esta linea antes de compra:

1. EasyStreamSave: claro, SEO-friendly, menos generico que Easy Video.
2. SimpleClip: muy limpio y facil de recordar, pero debe validarse por marca/dominio.
3. ClipEasy: corto y marcable, aunque suena menos premium.
4. EasyClipper: buen nombre de extension, pero puede confundirse con herramientas de clipping.

Decision: Bruno compro `easystreamsave.com`; avanzar con Easy Stream Save.

Decision pendiente: validar dominios en Hostinger antes de elegir.

## Producto MVP

Manifest V3.

Free inicial:

- detectar MP4/WebM/M3U8/MPD cuando aparezcan en la pestana;
- badge de cantidad detectada;
- popup limpio;
- boton para abrir la URL fuente detectada y diagnosticar previews/descargas fallidas;
- descarga directa con `chrome.downloads`;
- privacidad clara;
- sin anuncios.

Pro posterior:

- HLS avanzado;
- batch download;
- historial extendido;
- nombres inteligentes;
- cola de descargas;
- merge/conversion cuando sea tecnicamente estable.

No se promete:

- saltar DRM;
- descargar YouTube/Netflix/Disney universalmente;
- evadir restricciones legales o tecnicas.

## Monetizacion

Modelo recomendado:

- Free real para ganar confianza e instalaciones.
- Pro lifetime early adopter: USD 19.
- Pro lifetime normal: USD 29-39.
- Suscripcion solo si hay features cloud/costos recurrentes.
- Ads solo en web/blog si hay trafico SEO; no dentro de la extension.

Dato clave:

- Chrome Web Store Developer fee: USD 5 unico.
- AdSense no debe ser base de monetizacion dentro de la extension.

## Distribucion y SEO

Landing en ingles.

Paginas iniciales:

- Cococut alternative without ads.
- Chrome video downloader without ads.
- HLS downloader for Chrome.
- M3U8 downloader for Chrome.
- Why some videos cannot be downloaded.
- Privacy-first video downloader extension.

Canales:

- Chrome Web Store Optimization.
- Google Search Console.
- Blog SEO.
- Reddit/Product Hunt cuando el MVP sea estable.
- Tutoriales cortos.

## Necesidades

- Dominio comprado en Hostinger: `easystreamsave.com`.
- Cuenta Google separada del proyecto: `easystreamsave@gmail.com`.
- Registro Chrome Web Store Developer: USD 5.
- Acceso Search Console cuando exista dominio.
- Decision final de pricing de lanzamiento.

## DNS y Hosting

Decision 2026-06-19:

- Usar Cloudflare como DNS principal.
- Hostinger queda como registrador del dominio.
- Landing/deploy: preferencia Cloudflare Pages o Vercel.

Razonamiento:

- DNS mas limpio y rapido.
- SSL automatico.
- Facil verificacion de Search Console por registro TXT.
- Mejor control para iterar landing/SEO.
- Permite cambiar hosting sin depender del panel de Hostinger.

Completado:

- Dominio agregado a Cloudflare.
- Nameservers Cloudflare cargados en Hostinger.
- Bruno confirmo que Cloudflare dio OK del dominio.

Pendiente:

- Configurar root domain y `www`.
- Configurar Search Console cuando DNS propague.

Nameservers cargados en Hostinger:

- `brenda.ns.cloudflare.com`
- `elijah.ns.cloudflare.com`

## Agente Autonomo y Roadmap

Decision 2026-06-19:

- Crear un proceso autonomo recurrente para avanzar el proyecto cuando no requiera intervencion de Bruno.
- El agente debe usar `ROADMAP.md`, `WORKLOG.md`, `AGENT_BRIEF.md` y este business plan como fuente de verdad.
- El agente debe avisar a Bruno que trabajo hizo, donde trabajo y que necesita de el.
- El agente no debe hacer pagos, publicaciones, envios externos, cambios DNS ni acciones de cuenta sin permiso.
- El objetivo de largo plazo del agente es monetizar la app, no solo programar features.

Cron creado:

- Nombre: `Easy Stream Save roadmap agent`
- ID: `ecdbe371-7b49-4b34-b466-073231d5c8b5`
- Horario: todos los dias 04:00, 05:00, 06:00 y 07:00 America/Montevideo.
- Entrega: Telegram directo a Bruno.
- Alcance: sesion aislada, trabajo local, una unidad concreta por corrida.

## KPIs Iniciales

- Chrome Store installs: primer objetivo 100 installs organicas.
- Activacion: 30% de usuarios con al menos 1 video detectado.
- Retencion: 20% de usuarios activos despues de 7 dias.
- Conversion Pro futura: 1%-3% de usuarios activos.
- SEO: primeras 100 impresiones en Search Console.
- Contenido: home + 3 paginas SEO indexables antes de publicar en Chrome Store.

## Estrategia SEO/Growth

Decision 2026-06-19:

- Trabajar SEO con experimentos documentados, no cambios sueltos.
- Priorizar long-tail, alternativas a competidores, HLS/M3U8 y mensajes de privacidad/no ads.
- Medir cambios con ventana minima: 14 dias para senales iniciales y 30 dias para SEO organico.
- Optimizar tambien para buscadores con IA/LLM: paginas claras, FAQ, comparativas honestas, schema y limites tecnicos transparentes.

## Pricing Inicial Recomendado

Decision 2026-06-19:

- Free real al lanzamiento.
- Pro early adopter lifetime: USD 19.
- Pro lifetime normal: USD 29.
- Evaluar USD 39 solo con features Pro fuertes y estables.
- No usar suscripcion USD 19 mensual al inicio: caro frente a competencia y dificil de justificar.
- No usar ads dentro de la extension.

## Proximos Pasos Inmediatos

1. Definir identidad visual minima:
   - logo 128x128 para Chrome;
   - favicon;
   - paleta;
   - nombre visible: Easy Stream Save.

2. Preparar infraestructura web:
   - landing simple en ingles;
   - pagina privacy policy;
   - pagina terms/disclaimer;
   - sitemap;
   - configuracion Search Console cuando el DNS apunte.

3. Crear MVP extension:
   - Manifest V3;
   - service worker;
   - detector de media en network;
   - popup;
   - descarga directa con `chrome.downloads`;
   - almacenamiento local de medios detectados por tab;
   - badge con contador.

4. Preparar publicacion:
   - cuenta Google separada;
   - Chrome Web Store developer fee USD 5;
   - descripcion de store;
   - screenshots;
   - politica de privacidad publica en `easystreamsave.com`.

5. SEO inicial:
   - home orientada a "Chrome video downloader without ads";
   - articulo "Cococut alternative without ads";
   - articulo "HLS and M3U8 downloader for Chrome";
   - articulo "Why some videos cannot be downloaded".

## Scaffold Local

Creado 2026-06-19:

- `landing/`: home, privacy, terms, pagina de limites, sitemap, robots, logo y favicon.
- `extension/`: Manifest V3, service worker, popup, detector basico de MP4/WebM/M3U8/MPD/MOV/M4V, badge, descarga directa y limpieza de lista.
- `README.md`: instrucciones de preview local e instalacion manual.

Validacion inicial:

- `extension/manifest.json` parsea como JSON valido.
- Landing responde HTTP 200 en preview local.
