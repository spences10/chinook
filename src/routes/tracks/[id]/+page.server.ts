import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const track = db
		.query<
			{
				TrackId: number;
				Name: string;
				AlbumId: number;
				AlbumTitle: string;
				ArtistId: number;
				ArtistName: string;
				GenreId: number;
				GenreName: string;
				MediaType: string;
				Composer: string | null;
				Milliseconds: number;
				Bytes: number;
				UnitPrice: number;
			},
			{ id: number }
		>(
			`SELECT t.TrackId, t.Name, t.AlbumId, al.Title as AlbumTitle,
			        a.ArtistId, a.Name as ArtistName, t.GenreId, g.Name as GenreName,
			        mt.Name as MediaType, t.Composer, t.Milliseconds, t.Bytes, t.UnitPrice
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 LEFT JOIN genres g ON t.GenreId = g.GenreId
			 LEFT JOIN media_types mt ON t.MediaTypeId = mt.MediaTypeId
			 WHERE t.TrackId = $id`,
		)
		.get({ id: Number(params.id) });

	if (!track) throw error(404, 'Track not found');

	return { track };
};
