import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Camera, Color } from '@/types/canvas';

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

export function colorToCss(color: Color) {
	return `#${color.r.toString(16).padStart(2, '0')}${color.g
		.toString(16)
		.padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}
