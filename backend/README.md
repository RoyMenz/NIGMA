# NIGMA Backend (Event Registrations)

Node.js + Express + Supabase backend for NIGMA **event registrations**.

## What it supports

- `GET /api/events` - list events (`event_id`, `event_name`, `min_members`, `max_members`)
- `GET /api/events/:eventId` - single event
- `POST /api/registrations` - create a registration + members
- `GET /api/registrations/:registrationId` - fetch registration + members
- `GET /health` - health + DB connectivity check

## Setup

### 1) Install

From `backend/`:

```bash
npm install
```

### 2) Configure env

Copy `.env.example` to `.env` and set `SUPABASE_URL` + `SUPABASE_KEY`.

### 3) Create tables + seed events

Run these in Supabase SQL editor:

- `sql/schema.sql`
- `sql/seed.sql`

### 4) Start dev server

```bash
npm run dev
```

Server defaults to `http://localhost:8080`.

## API payloads

### Create registration

`POST /api/registrations`

```json
{
  "eventId": 11,
  "members": [
    { "fullName": "Jane Doe", "college": "NITTE", "cityState": "Mangalore, KA", "phone": "+91 9876543210" }
  ]
}
```

Notes:
- The API validates member count against `events.min_members` / `events.max_members`.
- `phone` is normalized to digits and stored as `BIGINT`.
- **Global rule enforced**: if a phone number already exists in `members`, that person cannot be registered for *any other* event (leader or member). The API returns `409` in that case.
