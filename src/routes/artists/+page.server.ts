import { db } from '$lib/server/db';

export const load = () => {
	const artists = db
		.query<
			{ ArtistId: number; Name: string; album_count: number },
			[]
		>(
			`SELECT a.ArtistId, a.Name, COUNT(al.AlbumId) as album_count
			 FROM artists a
			 LEFT JOIN albums al ON a.ArtistId = al.ArtistId
			 GROUP BY a.ArtistId
			 ORDER BY a.Name`,
		)
		.all();

	return { artists };
};
