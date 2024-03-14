import React from 'react';

import { Room } from '@/components/room';
import { Canvas } from './_component/canvas';

interface BoardIdPageProps {
	params: {
		boardId: string;
	};
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
	return (
		<Room roomId={params.boardId}>
			<Canvas boardId={params.boardId} />
		</Room>
	);
};

export default BoardIdPage;
