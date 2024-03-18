import {
	Circle,
	MousePointer2,
	Pencil,
	Redo2,
	Square,
	StickyNote,
	Type,
	Undo2,
} from 'lucide-react';

import { CanvasMode, CanvasState, LayerType } from '@/types/canvas';

import { ToolButton } from './tool-button';

interface ToolbarProps {
	canvasState: CanvasState;
	setCanvaState: (newState: CanvasState) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

export const Toolbar = ({
	canvasState,
	setCanvaState,
	undo,
	redo,
	canRedo,
	canUndo,
}: ToolbarProps) => {
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4">
			<div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
				<ToolButton
					label="Select"
					icon={MousePointer2}
					onClick={() => setCanvaState({ mode: CanvasMode.None })}
					isActive={
						canvasState.mode === CanvasMode.None ||
						canvasState.mode === CanvasMode.Translating ||
						canvasState.mode === CanvasMode.SelectionNet ||
						canvasState.mode === CanvasMode.Pressing ||
						canvasState.mode === CanvasMode.Resizing
					}
				/>
				<ToolButton
					label="Text"
					icon={Type}
					onClick={() =>
						setCanvaState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Text,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Text
					}
				/>
				<ToolButton
					label="Sticky note"
					icon={StickyNote}
					onClick={() =>
						setCanvaState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Note,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Note
					}
				/>
				<ToolButton
					label="Rectangle"
					icon={Square}
					onClick={() =>
						setCanvaState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Rectangle,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Rectangle
					}
				/>
				<ToolButton
					label="Ellipse"
					icon={Circle}
					onClick={() =>
						setCanvaState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Ellipse,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Ellipse
					}
				/>
				<ToolButton
					label="Pen"
					icon={Pencil}
					onClick={() =>
						setCanvaState({
							mode: CanvasMode.Pencil,
						})
					}
					isActive={canvasState.mode === CanvasMode.Pencil}
				/>
			</div>
			<div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
				<ToolButton
					label="Undo"
					icon={Undo2}
					onClick={undo}
					isDisabled={!canUndo}
				/>
				<ToolButton
					label="Redo"
					icon={Redo2}
					onClick={redo}
					isDisabled={!canRedo}
				/>
			</div>
		</div>
	);
};
export const ToolbarSkeleton = () => {
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
	);
};
