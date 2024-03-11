import { v } from 'convex/values';

import { query } from './_generated/server';

export const get = query({
	args: {
		orgId: v.string(),
		search: v.optional(v.string()),
	},
	handler: async (ctx, agrs) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unathorized');
		}

		const title = agrs.search as string;
		let boards = [];

		if (title) {
			// ? FOR SEARCH FUNC
			boards = await ctx.db
				.query('boards')
				.withSearchIndex('search_title', (q) =>
					q.search('title', title).eq('orgId', agrs.orgId)
				)
				.collect();
		} else {
			boards = await ctx.db
				.query('boards')
				.withIndex('by_org', (q) => q.eq('orgId', agrs.orgId)) //? q: query, eq: equal
				.order('desc')
				.collect();
		}

		const boardsWithFavoriteRelation = boards.map((board) => {
			return ctx.db
				.query('userFavorites')
				.withIndex('by_user_board', (q) =>
					q.eq('userId', identity.subject).eq('boardId', board._id)
				)
				.unique()
				.then((favorite) => {
					return {
						...board,
						isFavorite: !!favorite,
					};
				});
		});
		const boardsWithFavoriteBoolean = Promise.all(
			boardsWithFavoriteRelation
		);
		return boardsWithFavoriteBoolean;
	},
});
