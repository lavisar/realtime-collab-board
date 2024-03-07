'use client';
import React from 'react';
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { useOrganization } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';

export const EmptyBoard = () => {
	const { organization } = useOrganization();
	const create = useMutation(api.board.create);

	const handleOnClick = () => {
		if (!organization) return;
		create({
			orgId: organization?.id,
			title: 'Untitle',
		});
	};
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
				<Button onClick={handleOnClick} size="lg">
					Create board
				</Button>
			</div>
		</div>
	);
};
