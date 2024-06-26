# chinook

This is a SvelteKit project built with the
[Chinook database schema](https://www.sqlitetutorial.net/sqlite-sample-database/)
for SQLite.

Uses Turso, SvelteKit v2, Svelte v5, TailwindCSS and daisyUI.

Heavily inspried by this
[SvelteKit 1.0 with SQLite Tutorial](https://www.youtube.com/watch?v=iO4VUbQ6ua4)
by [Philipp Hartenfeller](https://github.com/phartenfeller)

It uses a Full Text Search (FTS5) table for a fuzzy search on the main
page.

Linked with routes for Track, Artist, Album and Genre.

Do a fuzzy search on the main select:

```sql
SELECT t.TrackId AS trackId,
      t.Name AS trackName,
      a.AlbumId AS albumId,
      a.Title AS albumTitle,
      at.ArtistId AS artistId,
      at.Name AS artistName,
      g.Name AS genre
FROM tracks t
JOIN albums a ON t.AlbumId = a.AlbumId
JOIN artists at ON a.ArtistId = at.ArtistId
JOIN genres g ON t.GenreId = g.GenreId
LIMIT ?;
```

Try full text search:

Step 1: Create the FTS5 Table

```sql
CREATE VIRTUAL TABLE new_tracks_fts USING fts5 (
  TrackId,
  Name,
  AlbumId,
  Title,
  ArtistId,
  ArtistName,
  Genre,
  prefix = '2 3 4'
);
```

Step 2: Insert Data into the FTS5 Table

```sql
INSERT INTO
  tracks_fts (
    TrackId,
    Name,
    AlbumId,
    Title,
    ArtistId,
    ArtistName,
    Genre
  )
SELECT
  t.TrackId,
  t.Name,
  a.AlbumId,
  a.Title,
  at.ArtistId,
  at.Name,
  g.Name
FROM
  tracks t
  JOIN albums a ON t.AlbumId = a.AlbumId
  JOIN artists at ON a.ArtistId = at.ArtistId
  JOIN genres g ON t.GenreId = g.GenreId;
```

Step 3: Query the FTS5 Table

```sql
SELECT * FROM tracks_fts WHERE tracks_fts MATCH 'My Track Name';
```
