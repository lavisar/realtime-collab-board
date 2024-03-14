'use client';

import { ReactNode } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';

import { RoomProvider } from '@/liveblocks.config';

interface RoomProps {
	children: ReactNode;
	roomId: string;
}

export const Room = ({ children, roomId }: RoomProps) => {
	return (
		<RoomProvider id={roomId} initialPresence={{}}>
			<ClientSideSuspense fallback={<div>Loading...</div>}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	);
};
