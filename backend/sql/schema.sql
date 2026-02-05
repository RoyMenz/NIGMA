-- NIGMA Registrations schema (Postgres)

CREATE TABLE IF NOT EXISTS events (
  event_id BIGINT PRIMARY KEY,
  event_name TEXT NOT NULL,
  min_members BIGINT NOT NULL CHECK (min_members >= 1),
  max_members BIGINT NOT NULL CHECK (max_members >= min_members)
);

CREATE TABLE IF NOT EXISTS registrations (
  registration_id BIGSERIAL PRIMARY KEY,
  event_id BIGINT NOT NULL REFERENCES events(event_id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS registrations_event_id_idx ON registrations(event_id);

CREATE TABLE IF NOT EXISTS members (
  member_id BIGSERIAL PRIMARY KEY,
  registration_id BIGINT NOT NULL REFERENCES registrations(registration_id) ON DELETE CASCADE,
  event_id BIGINT NOT NULL REFERENCES events(event_id) ON DELETE RESTRICT,
  full_name TEXT NOT NULL,
  college TEXT NOT NULL,
  city TEXT NOT NULL,
  phone BIGINT NOT NULL,
  CONSTRAINT members_phone_unique UNIQUE (phone)
);

CREATE INDEX IF NOT EXISTS members_registration_id_idx ON members(registration_id);
CREATE INDEX IF NOT EXISTS members_event_id_idx ON members(event_id);

