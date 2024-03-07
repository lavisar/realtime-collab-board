import { EmptyBoard } from './empty-board';
import { EmptyComponent } from './empty-component';

interface BoardListProps {
	orgId: string;
	query: {
		search?: string;
		favorites?: string;
	};
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
	// TODO: change to API call
	const data = [];
	console.log(query);
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

	return <div></div>;
};
