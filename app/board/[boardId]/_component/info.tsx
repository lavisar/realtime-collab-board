'use client';
import { Bug, Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useRenameModal } from '@/store/use-rename-modal';
import { useQuery } from 'convex/react';

import { Action } from '@/components/action';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

interface InfoProps {
	boardId: string;
}
const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

const TabSeparator = () => {
	return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
	const { onOpen } = useRenameModal();
	const data = useQuery(api.board.get, {
		id: boardId as Id<'boards'>,
	});
	if (!data) return <InfoSkeleton />;

	return (
		<div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
			<Hint label="Go to board" side="bottom" sideOffset={10}>
				<Button asChild className="px-2" variant="board">
					<Link href="/">
						<Image
							src="/logo.svg"
							alt="board logo"
							height={40}
							width={40}
						/>
					</Link>
				</Button>
			</Hint>
			<TabSeparator />
			<Hint label="Change board name" side="bottom" sideOffset={10}>
				<Button
					onClick={() => onOpen(data._id, data.title)}
					variant="board"
					className="text-base font-normal px-2"
				>
					{data.title}
				</Button>
			</Hint>
			<TabSeparator />
			<Action
				id={data._id}
				title={data.title}
				side="bottom"
				sideOffset={10}
			>
				<div>
					<Hint label="Main menu" side="bottom" sideOffset={10}>
						<Button size="icon" variant={'board'}>
							<Menu />
						</Button>
					</Hint>
				</div>
			</Action>
		</div>
	);
};

export const InfoSkeleton = () => {
	return (
		<div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
	);
};
