import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const EmptyBoard = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src={'/note.svg'} height={140} width={140} alt="Empty" />
			<h2 className="text-2xl font-semibold mt-6">
				Create your first board!
			</h2>
			<p className="text-muted-foreground text-sm mt-2">
				Start creating a new board for your organization
			</p>
			<div className="mt-6">
				<Button size="lg">Create board</Button>
			</div>
		</div>
	);
};
