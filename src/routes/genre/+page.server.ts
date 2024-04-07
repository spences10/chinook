import { get_genres } from '$lib/server/queries.js';

export const load = async () => {
	const { genres } = await get_genres();

	return {
		genres,
	};
};
