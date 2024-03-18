'use client';
import { useState } from 'react';

import { CanvasMode, CanvasState } from '@/types/canvas';
import { useHistory, useCanUndo, useCanRedo } from '@/liveblocks.config';

import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

interface CanvasProps {
	boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});

	const history = useHistory();
	const canUndo = useCanUndo();
	const canRedo = useCanRedo();

	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none">
			<Info boardId={boardId} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvaState={setCanvasState}
				canUndo={canUndo}
				canRedo={canRedo}
				undo={history.undo}
				redo={history.redo}
			/>
		</main>
	);
};
