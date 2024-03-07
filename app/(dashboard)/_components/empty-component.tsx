import React from 'react';
import Image from 'next/image';

interface EmptyComponentProps {
	img: string;
	headingText?: string;
	subText?: string;
	imgWidth?: number;
	imgHeight?: number;
}
export const EmptyComponent = ({
	img,
	headingText,
	subText,
	imgHeight = 140,
	imgWidth = 140,
}: EmptyComponentProps) => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src={img} height={imgHeight} width={imgWidth} alt="Empty" />
			<h2 className="text-2xl font-semibold mt-6">
				{headingText || 'No data!'}
			</h2>
			<p className="text-muted-foreground text-sm mt-2">
				{subText || ''}
			</p>
		</div>
	);
};
