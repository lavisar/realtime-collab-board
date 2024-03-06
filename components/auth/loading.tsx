import Image from 'next/image';
import React from 'react';

export const Loading = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image
				src={'/logo.svg'}
				alt="logo"
				height={120}
				width={120}
				className="animate-pulse duration-700"
			/>
		</div>
	);
};
