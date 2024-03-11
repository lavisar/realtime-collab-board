import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface NewBoardButtonProps {
	orgId: string;
	disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
	const router = useRouter();
	const { mutate, pending } = useApiMutation(api.board.create);
	const handleOnClick = () => {
		mutate({
			orgId,
			title: 'Untitle',
		})
			.then((id) => {
				toast.success('Board created.');
				router.push(`/board/${id}`);
			})
			.catch(() => toast.error('Failed to create board.'));
	};
	return (
		<button
			disabled={pending || disabled}
			onClick={handleOnClick}
			className={cn(
				'col-span-1 aspect-[100/127] bg-black opacity-25 rounded-lg hover:opacity-40 flex flex-col items-center justify-center py-6',
				(pending || disabled) &&
					'opacity-25 hover:opacity-25 cursor-not-allowed'
			)}
		>
			<div />
			<PlusCircle className="w-12 h-12 text-white stroke-1" />
			<p className="text-sm text-white font-medium mt-2">New board</p>
		</button>
	);
};

export default NewBoardButton;
