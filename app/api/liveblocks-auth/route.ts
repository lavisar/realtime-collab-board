import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, currentUser } from '@clerk/nextjs';

import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
	secret: 'sk_dev_IUifiD20_EJxoJNpVlwUuTjihi49WThLO6Xa1ktb10W_6BnCDuWw8i1heiIlYzLz',
});

export async function POST(request: Request) {
	const authorization = await auth(); //? Clerk Auth
	const user = await currentUser(); //? Clerk Auth

	if (!authorization || !user) {
		return new Response('Unauthorized', { status: 403 });
	}
	const { room } = await request.json();
	const board = await convex.query(api.board.get, { id: room });

	if (board?.orgId !== authorization.orgId) {
		return new Response('Unauthorized', { status: 403 });
	}

	const userInfo = {
		name: user.firstName || 'Anonymous',
		picture: user.imageUrl,
	};
	const session = liveblocks.prepareSession(user.id, { userInfo });
	if (room) {
		session.allow(room, session.FULL_ACCESS);
	}

	const { status, body } = await session.authorize();

	return new Response(body, { status });
}