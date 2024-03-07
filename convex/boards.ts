import { v } from 'convex/values';

import { query } from './_generated/server';

export const get = query({
	args: {
		orgId: v.string(),
	},
	handler: async (ctx, agrs) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Unathorized');
		}

		const boards = await ctx.db
			.query('boards')
			.withIndex('by_org', (q) => q.eq('orgId', agrs.orgId)) //? q: query, eq: equal
			.order('desc')
			.collect();

		return boards;
	},
});
