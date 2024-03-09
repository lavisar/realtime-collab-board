'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';

import { Overlay } from './overlay';
import { Footer } from './footer';
import { Action } from '@/components/action';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal } from 'lucide-react';

interface BoardCardProps {
	id: string;
	title: string;
	imageUrl: string;
	authorId: string;
	authorName: string;
	createdAt: number;
	orgId: string;
	isFavorite: boolean;
}

export const BoardCard = ({
	id,
	title,
	imageUrl,
	authorId,
	authorName,
	createdAt,
	orgId,
	isFavorite,
}: BoardCardProps) => {
	const { userId } = useAuth();
	const authorLabel = userId === authorId ? 'You' : authorName;
	const createAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
	return (
		<Link href={`/board/${id}`}>
			<div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
				<div className="relative flex-1 bg-amber-50">
					<Image src={imageUrl} fill alt={`board ${title}`} />
					<Overlay />
					<Action id={id} title={title} side="bottom">
						<button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
							<MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
						</button>
					</Action>
				</div>
				<Footer
					isFavorite={isFavorite}
					title={title}
					authorLabel={authorLabel}
					createdAtLabel={createAtLabel}
					onCLick={() => {}}
					disabled={false}
				/>
			</div>
		</Link>
	);
};

BoardCard.Skeleton = function BoardCardSkeleton() {
	return (
		<div className="aspect-[100/127] rounded-lg overflow-hidden">
			<Skeleton className="h-full w-full" />
		</div>
	);
};
