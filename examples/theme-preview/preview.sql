-- SQL keywords, quoted identifiers, values, aggregates, and windows.
CREATE TABLE berths (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    depth DECIMAL(5, 2) DEFAULT 3.50,
    open BOOLEAN DEFAULT TRUE,
    arrived_at TIMESTAMP
);

INSERT INTO berths (id, name, depth, open)
VALUES (1, 'Captain''s berth', 4.25, TRUE), (2, 'South', NULL, FALSE);

WITH available AS (
    SELECT id, name, COALESCE(depth, 0) AS depth
    FROM berths
    WHERE open = TRUE AND name NOT LIKE '%closed%'
)
SELECT name AS "Berth name",
       CASE WHEN depth >= 3 THEN 'deep' ELSE 'shallow' END AS category,
       ROW_NUMBER() OVER (ORDER BY depth DESC) AS rank,
       COUNT(*) OVER () AS total
FROM available
WHERE id IN (1, 2, 3)
ORDER BY depth DESC;

/* Changes and predicates provide another set of keyword scopes. */
UPDATE berths SET depth = depth + 0.25 WHERE id BETWEEN 1 AND 10;
