import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Camera, Color, Layer, Point, Side, XYHW } from '@/types/canvas';

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
/**
 * Return a color representation for connection ID
 *
 * @param {number} connectionId
 * @returns {string}
 */
export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length];
}

/**
 * Update new coordinates for pointer
 *
 * @param {React.PointerEvent} e
 * @param {Camera} camera
 * @returns {object}
 */
export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
) {
	return {
		x: Math.round(e.clientX) - camera.x,
		y: Math.round(e.clientY) - camera.y,
	};
}

/**
 * Turn RGB object to hex code
 */
export function colorToCss(color: Color) {
	return `#${color.r.toString(16).padStart(2, '0')}${color.g
		.toString(16)
		.padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

/**
 * Resize the bounds
 */
export function resizeBounds(bounds: XYHW, corner: Side, point: Point): XYHW {
	const result = {
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height,
	};

	if ((corner & Side.Left) === Side.Left) {
		result.x = Math.min(point.x, bounds.x + bounds.width);
		result.width = Math.abs(bounds.x + bounds.width - point.x);
	}

	if ((corner & Side.Right) === Side.Right) {
		result.x = Math.min(point.x, bounds.x);
		result.width = Math.abs(point.x - bounds.x);
	}

	if ((corner & Side.Top) === Side.Top) {
		result.y = Math.min(point.y, bounds.y + bounds.height);
		result.height = Math.abs(bounds.y + bounds.height - point.y);
	}

	if ((corner & Side.Bottom) === Side.Bottom) {
		result.y = Math.min(point.y, bounds.y);
		result.height = Math.abs(point.y - bounds.y);
	}

	return result;
}

export function findIntersectingLayersWithRectangle(
	layerIds: readonly string[],
	layers: ReadonlyMap<string, Layer>,
	a: Point,
	b: Point
) {
	const rect: XYHW = {
		x: Math.min(a.x, b.x),
		y: Math.min(a.y, b.y),
		width: Math.abs(a.x - b.x),
		height: Math.abs(a.y - b.y),
	};
	const ids = [];

	for (const layerId of layerIds) {
		const layer = layers.get(layerId);

		if (layer == null) {
			continue;
		}
		const { x, y, width, height } = layer;
		if (
			rect.x + rect.width > x &&
			rect.x < x + width &&
			rect.y + rect.height > y &&
			rect.y < y + height
		) {
			ids.push(layerId);
		}
	}
	return ids;
}
