import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface NewBoardButtonProps {
	orgId: string;
	disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
	const { mutate, pending } = useApiMutation(api.board.create);
	const handleOnClick = () => {
		mutate({
			orgId,
			title: 'Untitle',
		})
			.then((id) => toast.success('Board created.')) // TODO: redirect to board page
			.catch(() => toast.error('Failed to create board.'));
	};
	return (
		<button
			disabled={pending}
			onClick={handleOnClick}
			className={cn(
				'col-span-1 aspect-[100/127] bg-black opacity-25 rounded-lg hover:opacity-40 flex flex-col items-center justify-center py-6',
				(pending || disabled) && 'opacity-75'
			)}
		>
			<div />
			<PlusCircle className="w-12 h-12 text-white stroke-1" />
			<p className="text-sm text-white font-medium mt-2">New board</p>
		</button>
	);
};

export default NewBoardButton;
