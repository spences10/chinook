import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const genre = db
		.query<
			{ GenreId: number; Name: string },
			{ id: number }
		>(`SELECT GenreId, Name FROM genres WHERE GenreId = $id`)
		.get({ id: Number(params.id) });

	if (!genre) throw error(404, 'Genre not found');

	const tracks = db
		.query<
			{
				TrackId: number;
				Name: string;
				ArtistName: string;
				AlbumTitle: string;
				Milliseconds: number;
			},
			{ id: number }
		>(
			`SELECT t.TrackId, t.Name, a.Name as ArtistName, al.Title as AlbumTitle, t.Milliseconds
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE t.GenreId = $id
			 ORDER BY t.Name
			 LIMIT 50`,
		)
		.all({ id: Number(params.id) });

	return { genre, tracks };
};
