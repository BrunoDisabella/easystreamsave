# Subscription Backend Plan - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Objetivo

Convertir Easy Stream Save en un SaaS de extension Chrome con suscripcion real, sin poner logica critica ni secretos dentro de la extension.

La web vende. La pasarela cobra. El backend decide si una licencia esta activa. La extension solo consulta y cachea el resultado.

## Stack recomendado para MVP

- Pagos: Paddle primero si se vende global, porque actua como Merchant of Record.
- Backend: API pequena en Node/Express, Hono o Cloudflare Workers.
- Base de datos: Supabase Postgres o Cloudflare D1. Supabase gana si queremos dashboard, SQL facil y webhooks comodos.
- Email transaccional: Resend o proveedor simple para activacion, recibos operativos y soporte.

## Tablas minimas

### users

- `id`
- `email`
- `created_at`
- `last_seen_at`

### subscriptions

- `id`
- `user_id`
- `provider`
- `provider_customer_id`
- `provider_subscription_id`
- `plan`
- `status`
- `current_period_start`
- `current_period_end`
- `cancel_at_period_end`
- `created_at`
- `updated_at`

### licenses

- `id`
- `user_id`
- `license_key_hash`
- `status`
- `plan`
- `expires_at`
- `last_validated_at`
- `created_at`
- `updated_at`

### webhook_events

- `id`
- `provider`
- `event_id`
- `event_type`
- `processed_at`
- `payload_hash`

`webhook_events.event_id` debe ser unico para idempotencia.

## Endpoints minimos

- `POST /api/webhooks/paddle`
  - Verifica firma.
  - Guarda evento idempotente.
  - Crea/actualiza usuario, suscripcion y licencia.

- `POST /api/license/activate`
  - Input: email o checkout session id.
  - Devuelve estado Pro si la suscripcion esta activa.

- `GET /api/license/status`
  - Input: licencia/token firmado.
  - Devuelve `active`, `plan`, `expires_at`, `grace_until`.

- `POST /api/license/deactivate-device`
  - Futuro, solo si limitamos dispositivos.

## Extension

- Nunca guardar secretos.
- Guardar cache local de licencia con vencimiento corto.
- Si el backend falla, dar gracia de 3 dias a usuarios Pro ya validados.
- Si la licencia vence, bajar a Free sin romper deteccion ni preview.

## Checkout

- Home: instalar/probar.
- Pricing: comparar Free vs Pro.
- Checkout alojado en Paddle.
- Success: confirma email, activa licencia, instruye volver a la extension.
- Cancel: vuelve a pricing/free sin friccion.
- Customer portal: cancelacion y gestion de renovacion.

## Pendientes antes de cobrar

- Elegir Paddle o Stripe definitivo.
- Crear backend y DB.
- Implementar webhook firmado.
- Implementar validacion desde extension.
- Definir politica de dispositivos.
- Ajustar Privacy/Terms con el proveedor real y pais/empresa real.
