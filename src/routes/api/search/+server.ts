import { get_initial_tracks, search_tracks } from '$lib/server';
import type { Row } from '@libsql/client';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const search_term = url.searchParams.get('search_term')?.toString();

	let tracks: Row[] = [];

	if (!search_term) {
		tracks = await get_initial_tracks();
	} else {
		tracks = (await search_tracks(search_term)) ?? [];
	}

	return json(tracks);
};
