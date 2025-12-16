import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const artist = db
		.query<
			{ ArtistId: number; Name: string },
			{ id: number }
		>(`SELECT ArtistId, Name FROM artists WHERE ArtistId = $id`)
		.get({ id: Number(params.id) });

	if (!artist) throw error(404, 'Artist not found');

	const albums = db
		.query<
			{ AlbumId: number; Title: string; track_count: number },
			{ id: number }
		>(
			`SELECT al.AlbumId, al.Title, COUNT(t.TrackId) as track_count
			 FROM albums al
			 LEFT JOIN tracks t ON al.AlbumId = t.AlbumId
			 WHERE al.ArtistId = $id
			 GROUP BY al.AlbumId
			 ORDER BY al.Title`,
		)
		.all({ id: Number(params.id) });

	return { artist, albums };
};
