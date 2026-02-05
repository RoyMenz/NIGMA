-- Seed events to match current frontend event IDs
-- Safe to re-run: upserts by event_id.

INSERT INTO events (event_id, event_name, min_members, max_members) VALUES
  (1,  'Best Manager',        1, 1),
  (2,  'Finance',             2, 2),
  (3,  'Marketing',           2, 2),
  (4,  'HR',                  2, 2),
  (5,  'Event Management',    2, 2),
  (6,  'Coding Challenge',    2, 2),
  (7,  'E-Sports',            4, 4),
  (8,  'IT Treasure Hunt',    2, 2),
  (9,  'Maths Heptathlon',    4, 4),
  (10, 'Hackathon',           2, 4),
  (11, 'Variety Event',      10, 17),
  (12, 'Mock Press',          1, 1),
  (13, 'Best out of Waste',   2, 2),
  (14, 'Reel Making',         1, 1),
  (15, 'Face Painting',       2, 2)
ON CONFLICT (event_id) DO UPDATE SET
  event_name = EXCLUDED.event_name,
  min_members = EXCLUDED.min_members,
  max_members = EXCLUDED.max_members;

