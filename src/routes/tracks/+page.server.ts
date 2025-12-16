import { db } from '$lib/server/db';

export const load = () => {
	const tracks = db
		.query<
			{
				TrackId: number;
				Name: string;
				AlbumTitle: string;
				ArtistName: string;
				Milliseconds: number;
			},
			[]
		>(
			`SELECT t.TrackId, t.Name, al.Title as AlbumTitle, a.Name as ArtistName, t.Milliseconds
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 ORDER BY t.Name
			 LIMIT 100`,
		)
		.all();

	return { tracks };
};
