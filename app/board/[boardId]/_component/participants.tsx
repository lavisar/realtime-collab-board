'use client';

import { useOthers, useSelf } from '@/liveblocks.config';
import { connectionIdToColor } from '@/lib/utils';
import { UserAvatar } from './user-avatar';

const MAX_SHOW_USERS = 2;

export const Participants = () => {
	const users = useOthers();
	const currentUser = useSelf();
	const hasMoreUsers = users.length > MAX_SHOW_USERS;

	return (
		<div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
			<div className="flex gap-x-2">
				{users
					.slice(0, MAX_SHOW_USERS)
					.map(({ connectionId, info }) => {
						return (
							<UserAvatar
								key={connectionId}
								src={info?.picture}
								name={info?.name}
								borderColor={connectionIdToColor(connectionId)}
								fallback={info?.name?.[0] || 'T'}
							/>
						);
					})}
				{currentUser && (
					<UserAvatar
						src={currentUser.info?.picture}
						name={`${currentUser.info?.name} (You)`}
						borderColor={connectionIdToColor(
							currentUser.connectionId
						)}
						fallback={currentUser.info?.name?.[0]}
					/>
				)}
				{hasMoreUsers && (
					<UserAvatar
						name={`${users.length - MAX_SHOW_USERS} more`}
						fallback={`+${users.length - MAX_SHOW_USERS}`}
					/>
				)}
			</div>
		</div>
	);
};
export const ParticipantSkeleton = () => {
	return (
		<div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
	);
};
