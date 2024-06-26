'use client';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { EmptyBoard } from './empty-board';
import { EmptyComponent } from './empty-component';
import { BoardCard } from './board-card';
import NewBoardButton from './new-board-button';

interface BoardListProps {
	orgId: string;
	query: {
		search?: string;
		favorites?: string;
	};
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
	const data = useQuery(api.boards.get, { orgId, search: query.search });
	//? convex return null when data is empty, return undefined when in loading state
	if (data === undefined) {
		return (
			<div>
				<h2 className="text-3xl">
					{query.favorites ? 'Favorite boards' : 'Team boards'}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
					<NewBoardButton orgId={orgId} disabled />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
				</div>
			</div>
		);
	}
	if (!data?.length && query.search) {
		return (
			<EmptyComponent
				img="/empty-search.svg"
				headingText="No results found!"
				subText="Try searching for something else"
			/>
		);
	}
	if (!data?.length && query.favorites) {
		return (
			<EmptyComponent
				img="/empty-favorites.svg"
				headingText="No favorite boards found!"
				subText="Try favoriting a board"
			/>
		);
	}
	if (!data?.length) {
		return <EmptyBoard />;
	}
	const finalData = query.favorites
		? data.filter((item) => item.isFavorite === true)
		: data;
	return (
		<div>
			<h2 className="text-3xl">
				{query.favorites ? 'Favorite boards' : 'Team boards'}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
				<NewBoardButton orgId={orgId} />
				{finalData.map((board) => (
					<BoardCard
						key={board._id}
						id={board._id}
						title={board.title}
						imageUrl={board.imageUrl}
						authorId={board.authorId}
						authorName={board.authorName}
						createdAt={board._creationTime}
						orgId={board.orgId}
						isFavorite={board.isFavorite}
					/>
				))}
			</div>
		</div>
	);
};
