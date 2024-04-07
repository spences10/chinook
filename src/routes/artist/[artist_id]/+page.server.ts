import { get_albums_by_artist_id } from '$lib/server/queries.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const artist_id = parseInt(params.artist_id);

	if (!artist_id) {
		error(404, 'Artist not found');
	}

	const { artist, albums } = await get_albums_by_artist_id(artist_id);

	return {
		artist,
		albums,
	};
};
