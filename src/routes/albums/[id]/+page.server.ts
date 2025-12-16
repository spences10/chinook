import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const album = db
		.query<
			{
				AlbumId: number;
				Title: string;
				ArtistId: number;
				ArtistName: string;
			},
			{ id: number }
		>(
			`SELECT al.AlbumId, al.Title, al.ArtistId, a.Name as ArtistName
			 FROM albums al
			 JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE al.AlbumId = $id`,
		)
		.get({ id: Number(params.id) });

	if (!album) throw error(404, 'Album not found');

	const tracks = db
		.query<
			{ TrackId: number; Name: string; Milliseconds: number },
			{ id: number }
		>(
			`SELECT TrackId, Name, Milliseconds
			 FROM tracks
			 WHERE AlbumId = $id
			 ORDER BY TrackId`,
		)
		.all({ id: Number(params.id) });

	return { album, tracks };
};
