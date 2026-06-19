# Monetization and Payments - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Decision Recomendada

Modelo MVP:

- Free: suficientemente util para generar confianza.
- Pro Starter: USD 1.99/mes.
- Pro Annual: USD 19/anio cuando haya retencion probada.
- Lifetime early adopter: evaluar USD 39 solo si necesitamos caja/validacion rapida.

No conviene que el Free sea inutil. La competencia promete mucho gratis; si bloqueamos demasiado temprano, perdemos confianza antes de demostrar valor.

Decision de Bruno 2026-06-19: mantener precio inicial Pro en USD 1.99/mes. No subirlo en el MVP.

## Free vs Pro

Free recomendado para MVP:

- 10 descargas cada 30 minutos.
- Preview y deteccion basica incluidos.
- MP4/WebM directo incluidos.
- HLS/M3U8 detectado, pero procesamiento/merge avanzado limitado.
- Sin watermark.
- Sin cuenta obligatoria hasta que el usuario llegue al limite.

Justificacion 2026-06-19:

- 5 descargas cada 30 minutos queda demasiado restrictivo para un producto nuevo: bloquea antes de que el usuario confie.
- Competidores grandes comunican core gratis amplio o ilimitado, y empujan Pro por batch, calidad, companion app, HLS avanzado o comodidad.
- 10 cada 30 minutos es una barrera mas razonable para abuso casual sin matar activacion.
- Medir antes de endurecer: si muchos usuarios llegan al limite y vuelven, mantener; si pocos llegan, el limite no vende y conviene empujar Pro por features.

Pro USD 1.99/mes:

- Descargas ilimitadas razonables.
- Batch download.
- Cola de descargas.
- Historial local.
- Nombres de archivo mejores.
- HLS/M3U8 avanzado cuando este implementado.
- Union local de segmentos HLS/M3U8 a MP4 solo si es estable y permitido por la fuente.
- Descarga de subtitulos cuando esten disponibles y autorizados.
- Selector de formato/calidad cuando el sitio exponga varias fuentes.
- Calidad 1080p/4K solo si la fuente real existe; no prometer upscale ni bypass.
- Reintentos.
- Soporte prioritario simple.

Regla: no cobrar por lo que todavia no existe. Si HLS merge no esta listo, no ponerlo como promesa principal.

## Como Limitar Tecnicamente

MVP local:

- Usar `chrome.storage.local` para contador por ventana.
- Guardar `count` y `resetAt`.
- Reset cada 30 minutos.
- Si se alcanza limite, mostrar pantalla Pro con CTA.
- No bloquear deteccion ni preview; bloquear solo accion de descarga despues del limite.

Limitacion mas robusta futura:

- Cuenta + licencia remota.
- Backend simple con Stripe/Paddle webhook.
- Cache local de licencia con expiracion.
- Modo offline con gracia de 3-7 dias.

## Plataforma de Pago

Decision recomendada para produccion MVP: **Paddle primero**.

Motivos:

- Merchant of Record: maneja IVA/VAT y compliance internacional.
- Bueno para software/SaaS chico.
- Reduce carga fiscal/operativa inicial.
- Mejor encaje para vender software global desde Uruguay que depender de Stripe directo.

Implementacion:

- Landing muestra plan Pro Starter USD 1.99/mes.
- Boton Pro abre checkout Paddle alojado.
- Paddle webhook llega a backend propio.
- Backend guarda licencia por email/customer id.
- Extension valida licencia contra backend y cachea estado local con expiracion.
- Si falla internet, dar gracia de 3 dias para usuarios Pro ya validados.

Alternativa: **Stripe**.

- Mejor DX/API.
- Mas control.
- Pero nosotros quedamos mas expuestos a impuestos/VAT y configuracion operativa.

Decision:

- Si el objetivo es vender global con bajo mantenimiento: Paddle primero.
- Si necesitamos integracion rapida y ya hay Stripe operativo: Stripe puede ganar.
- Lemon Squeezy queda como alternativa secundaria tipo Merchant of Record si Paddle complica aprobacion o UX.
- No usar Chrome Web Store Payments: esta deprecado/no es infraestructura actual para monetizacion nueva.

## Timing de Paywall

No activar paywall fuerte el dia uno.

Secuencia recomendada:

1. Primeras 2-4 semanas: Free util, mensaje suave "Pro coming soon".
2. Activar Pro cuando haya 500-1000 usuarios activos, 20 reseñas reales o evidencia clara de uso repetido.
3. No bloquear deteccion basica ni preview por paywall.
4. Bloquear Pro solo donde haya valor real:
   - limite diario/ventana alcanzado;
   - batch;
   - cola;
   - HLS/M3U8 avanzado;
   - subtitulos;
   - historial/renombrado avanzado.

## Seguridad / Antirrobo

No existe proteccion perfecta del codigo de una extension: el usuario recibe JS/HTML/CSS y puede inspeccionarlo. La estrategia real es no poner secretos ni logica critica dentro de la extension.

Reglas:

- No meter API keys privadas en la extension.
- No confiar en `chrome.storage.local` para licencias Pro definitivas.
- Validar licencia en backend.
- Webhooks firmados del proveedor de pago.
- Rate limit por licencia/IP cuando haya backend.
- Ofuscar/minificar puede ayudar contra copia casual, pero no es seguridad real.
- Las features Pro sensibles deben depender de backend o de checks remotos revalidables.
- Branding, SEO, soporte, actualizaciones y confianza son parte de la defensa contra clones.

## Proximas Paginas de Pago

- `/pricing/`: Free vs Pro, USD 1.99/mes, limites honestos. Mock estatico creado, sin checkout real.
- `/checkout/success/`: instrucciones para activar Pro. Mock estatico creado.
- `/checkout/cancel/`: volver a Free y explicar limite 10 descargas/30 min. Mock estatico creado.
- `/account/`: futuro login/licencia, no necesario para primer mock.

## Activacion antes de Pago

Eventos de valor a medir sin tracking invasivo:

- `first_media_detected`
- `first_preview_loaded`
- `first_download_started`
- `free_limit_reached`
- `pro_cta_clicked`

Sin analitica invasiva en MVP: se puede empezar con eventos locales y feedback manual. Para Chrome Store, mantener privacy questionnaire simple.
