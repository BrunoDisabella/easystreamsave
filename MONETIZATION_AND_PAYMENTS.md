# Monetization and Payments - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Decision Recomendada

Modelo MVP:

- Free: suficientemente util para generar confianza.
- Pro Starter: USD 1.99/mes.
- Pro Annual: USD 14.99-19.99/anio cuando haya retencion probada.
- Lifetime early adopter: evaluar USD 19 solo si necesitamos caja/validacion rapida.

No conviene que el Free sea inutil. La competencia promete mucho gratis; si bloqueamos demasiado temprano, perdemos confianza antes de demostrar valor.

## Free vs Pro

Free recomendado para MVP:

- 5 descargas por dia o 25 por semana.
- Preview y deteccion basica incluidos.
- MP4/WebM directo incluidos.
- HLS/M3U8 detectado, pero procesamiento/merge avanzado limitado.
- Sin watermark.
- Sin cuenta obligatoria hasta que el usuario llegue al limite.

Pro USD 1.99/mes:

- Descargas ilimitadas razonables.
- Batch download.
- Historial local.
- Nombres de archivo mejores.
- HLS/M3U8 avanzado cuando este implementado.
- Reintentos/cola.
- Soporte prioritario simple.

Regla: no cobrar por lo que todavia no existe. Si HLS merge no esta listo, no ponerlo como promesa principal.

## Como Limitar Tecnicamente

MVP local:

- Usar `chrome.storage.local` para contador diario/semanal.
- Guardar fecha UTC y conteo.
- Reset diario local.
- Si se alcanza limite, mostrar pantalla Pro con CTA.
- No bloquear deteccion ni preview; bloquear solo accion de descarga despues del limite.

Limitacion mas robusta futura:

- Cuenta + licencia remota.
- Backend simple con Stripe/Paddle webhook.
- Cache local de licencia con expiracion.
- Modo offline con gracia de 3-7 dias.

## Plataforma de Pago

Opcion recomendada para MVP internacional: **Paddle**.

Motivos:

- Merchant of Record: maneja IVA/VAT y compliance internacional.
- Bueno para software/SaaS chico.
- Reduce carga fiscal/operativa inicial.

Alternativa: **Stripe**.

- Mejor DX/API.
- Mas control.
- Pero nosotros quedamos mas expuestos a impuestos/VAT y configuracion operativa.

Decision por ahora:

- Investigar Paddle vs Stripe antes de implementar checkout.
- Si el objetivo es vender global con bajo mantenimiento: Paddle primero.
- Si necesitamos integracion rapida y ya hay Stripe operativo: Stripe puede ganar.

## Activacion antes de Pago

Eventos de valor a medir sin tracking invasivo:

- `first_media_detected`
- `first_preview_loaded`
- `first_download_started`
- `free_limit_reached`
- `pro_cta_clicked`

Sin analitica invasiva en MVP: se puede empezar con eventos locales y feedback manual. Para Chrome Store, mantener privacy questionnaire simple.

