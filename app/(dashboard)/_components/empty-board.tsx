'use client';
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useApiMutation } from '@/hooks/use-api-mutation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const EmptyBoard = () => {
	const router = useRouter();
	const { organization } = useOrganization();
	const { mutate, pending } = useApiMutation(api.board.create);

	const handleOnClick = () => {
		if (!organization) return;
		mutate({
			orgId: organization?.id,
			title: 'Untitle',
		})
			.then((id) => {
				toast.success('Board created.');
				router.push(`/board/${id}`);
			})
			.catch(() => toast.error('Failed to create board.'));
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
				<Button disabled={pending} onClick={handleOnClick} size="lg">
					Create board
				</Button>
			</div>
		</div>
	);
};
