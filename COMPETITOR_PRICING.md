# Competitor Pricing and Monetization - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Resumen

El mercado mezcla free, lifetime, suscripcion y ads. Para Easy Stream Save conviene entrar con Free real + lifetime accesible, no suscripcion cara desde el dia 1.

## Datos Observados

### Video DownloadHelper

- Modelo: licencia lifetime.
- Su documentacion dice que vende licencias lifetime y que no hay costos adicionales para el usuario final.
- Nota importante: Chrome no permite descargas de YouTube segun su propia ayuda.
- Bruno vio oferta/comunicacion alrededor de USD 24 lifetime.
- Referencias de comunidad mencionan licencias cerca de USD 20-30 segun navegador/periodo.

Implicacion:
Lifetime funciona en este nicho. Hay sensibilidad si el usuario siente que tiene que pagar de nuevo por navegador.

### CocoCut

- Modelo observado: free con premium opcional.
- Mensaje fuerte: descargar gratis sin registro.
- Premium se posiciona para batch, calidad, soporte, experiencia ad-free o mejoras avanzadas.

Implicacion:
El free debe ser realmente util. Si no, el usuario se va antes de confiar.

### FetchV

- Modelo observado: free/generic video downloader.
- Fuerte en HLS/M3U8, live streams, blob/recording mode.

Implicacion:
Nuestra diferenciacion no puede ser solo "detecta m3u8"; necesitamos UX, confianza, privacidad, explicacion y pricing claro.

### Video Downloader Pro / similares

- Modelo observado en paginas comparativas/pricing: mensual alrededor de USD 6.99, anual USD 29.99 y lifetime USD 49.99.
- Tambien aparecen productos lifetime mas caros para apps desktop/all-in-one.

Implicacion:
USD 49 lifetime puede existir, pero para entrar sin reputacion es agresivo. USD 19-29 es mas razonable al inicio.

## Pricing Recomendado

Lanzamiento:

- Free: deteccion y descargas basicas reales.
- Pro early adopter lifetime: USD 19.
- Pro normal lifetime: USD 29.
- Subir a USD 39 solo cuando haya HLS avanzado/batch/historial estable.

Evitar al inicio:

- Suscripcion mensual USD 19: caro contra competencia y dificil de justificar.
- Ads dentro de extension: mala experiencia y mas riesgo de politicas.
- Free inutil: destruye confianza y reviews.

## Feature Gates Pro

Free:

- Detectar MP4/WebM/M3U8/MPD.
- Descargar archivos directos.
- Badge por pestana.
- Lista limpia.

Pro:

- Batch download.
- HLS avanzado/merge cuando este estable.
- Historial.
- Nombres inteligentes.
- Cola.
- Priority support.

## Criterio de Revision

- Revisar pricing cada 30 dias o cuando haya nueva evidencia fuerte.
- No cambiar precio publico sin actualizar este archivo y `BUSINESS_PLAN.md`.
- Validar contra conversion real, installs, reviews y soporte.
