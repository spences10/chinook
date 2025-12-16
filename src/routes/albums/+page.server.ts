import { db } from '$lib/server/db';

export const load = () => {
	const albums = db
		.query<
			{ AlbumId: number; Title: string; ArtistName: string },
			[]
		>(
			`SELECT al.AlbumId, al.Title, a.Name as ArtistName
			 FROM albums al
			 JOIN artists a ON al.ArtistId = a.ArtistId
			 ORDER BY al.Title`,
		)
		.all();

	return { albums };
};
