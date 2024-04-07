import type { Value } from '@libsql/client';
import { turso_client } from '.';

const client = turso_client();

export const get_initial_tracks = async (limit = 50) => {
	const tracks = await client.execute({
		sql: `SELECT t.TrackId AS TrackId,
                t.Name AS Name,
                a.AlbumId AS AlbumId,
                a.Title AS Title,
                at.ArtistId AS ArtistId,
                at.Name AS ArtistName,
                g.Name AS Genre,
                g.GenreId AS GenreId
          FROM tracks t
          JOIN albums a ON t.AlbumId = a.AlbumId
          JOIN artists at ON a.ArtistId = at.ArtistId
          JOIN genres g ON t.GenreId = g.GenreId
          LIMIT ?;`,
		args: [limit],
	});

	return tracks.rows;
};

export const search_tracks = async (
	search_term: boolean | Value | Uint8Array | Date
) => {
	const escaped_search_term = `"${String(search_term).replace(/"/g, '""')}"*`;

	const tracks = await client.execute({
		sql: `SELECT * FROM tracks_fts WHERE tracks_fts MATCH ?;`,
		args: [escaped_search_term],
	});

	return tracks.rows;
};

export const get_album_by_id = async (album_id: number) => {
	const album = await client.execute({
		sql: `SELECT 
							a.Title AS AlbumTitle, 
							t.Name AS TrackName, 
							at.Name AS ArtistName,
							(t.Milliseconds / 60000) || 'm ' || ((t.Milliseconds % 60000) / 1000) || 's' AS Duration
					FROM 
							albums a
					JOIN 
							tracks t ON a.AlbumId = t.AlbumId
					JOIN 
							artists at ON a.ArtistId = at.ArtistId
					WHERE 
							a.AlbumId = ?;`,
		args: [album_id],
	});

	return {
		artist: album.rows[0].ArtistName,
		album: album.rows[0].AlbumTitle,
		tracks: album.rows,
	};
};

export const get_albums_by_artist_id = async (artist_id: number) => {
	const albums = await client.execute({
		sql: `SELECT 
							a.AlbumId, 
							a.Title AS AlbumTitle, 
							at.Name AS ArtistName,
							(SELECT COUNT(*) FROM tracks t WHERE t.AlbumId = a.AlbumId) AS TrackCount
					FROM 
							albums a
					JOIN 
							artists at ON a.ArtistId = at.ArtistId
					WHERE 
							a.ArtistId = ?;`,
		args: [artist_id],
	});

	return {
		artist: albums.rows[0].ArtistName,
		albums: albums.rows,
	};
};

export const get_track_by_track_id = async (track_id: number) => {
	const track = await client.execute({
		sql: `SELECT 
							t.TrackId, 
							t.Name AS TrackName, 
							a.AlbumId,
							a.Title AS AlbumTitle, 
							at.ArtistId,
							at.Name AS ArtistName,
							g.GenreId,
							g.Name AS GenreName,
							(t.Milliseconds / 60000) || 'm ' || ((t.Milliseconds % 60000) / 1000) || 's' AS Duration,
							mt.Name AS MediaType,
							t.UnitPrice AS Price
					FROM 
							tracks t
					JOIN 
							albums a ON t.AlbumId = a.AlbumId
					JOIN 
							artists at ON a.ArtistId = at.ArtistId
					JOIN 
							genres g ON t.GenreId = g.GenreId
					JOIN 
							media_types mt ON t.MediaTypeId = mt.MediaTypeId
					WHERE 
							t.TrackId = ?;`,
		args: [track_id],
	});

	return {
		artist: track.rows[0].ArtistName,
		track: track.rows,
		track_name: track.rows[0].TrackName,
	};
};

export const get_genres = async () => {
	const genres = await client.execute(
		`SELECT GenreId, Name AS GenreName FROM genres ORDER BY Name;`
	);

	return {
		genres: genres.rows,
	};
};

export const get_albums_by_genre = async (genre_id: number) => {
	const albums = await client.execute({
		sql: `SELECT 
							a.AlbumId, 
							a.Title AS AlbumTitle, 
							g.GenreId,
							g.Name AS GenreName,
							at.ArtistId,
							at.Name AS ArtistName
					FROM 
							albums a
					JOIN 
							tracks t ON a.AlbumId = t.AlbumId
					JOIN 
							genres g ON t.GenreId = g.GenreId
					JOIN 
							artists at ON a.ArtistId = at.ArtistId
					WHERE 
							g.GenreId = ?
					GROUP BY 
							a.AlbumId, a.Title, g.GenreId, g.Name, at.ArtistId, at.Name;`,
		args: [genre_id],
	});

	return {
		genre: albums.rows[0].GenreName,
		albums: albums.rows,
	};
};
