import { get_albums_by_genre } from '$lib/server/queries.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const genre_id = parseInt(params.genre_id);

	if (!genre_id) {
		error(404, 'Artist not found');
	}

	const { albums, genre } = await get_albums_by_genre(genre_id);

	return {
		albums,
		genre,
	};
};
