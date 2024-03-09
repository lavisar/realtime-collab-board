'use client';

import { toast } from 'sonner';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { api } from '@/convex/_generated/api';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRenameModal } from '@/store/use-rename-modal';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';

interface ActionProps {
	children: React.ReactNode;
	side?: DropdownMenuContentProps['side'];
	sideOffset?: DropdownMenuContentProps['sideOffset'];
	id: string;
	title: string;
}

export const Action = ({
	children,
	side,
	sideOffset,
	id,
	title,
}: ActionProps) => {
	const { onOpen } = useRenameModal();
	const { mutate, pending } = useApiMutation(api.board.remove);

	const onCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/board/${id}`)
			.then(() => toast.success('Coppied to clipboard'))
			.catch(() => toast.error('Failed to copy'));
	};
	const onDelete = () => {
		mutate({ id })
			.then(() => toast.success('Board deleted.'))
			.catch(() => toast.error('Failed to delete'));
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				onClick={(e) => e.stopPropagation()}
				side={side}
				sideOffset={sideOffset}
				className="w-60"
			>
				<DropdownMenuItem
					onClick={onCopyLink}
					className="p-3 cursor-pointer"
				>
					<Link2 className="h-4 w-4 mr-2" /> Copy board link
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onOpen(id, title)}
					className="p-3 cursor-pointer"
				>
					<Pencil className="h-4 w-4 mr-2" /> Rename
				</DropdownMenuItem>
				<ConfirmModal
					header="Are you sure to delete this board?"
					description="This action will delete the board and cannot be undo."
					disabled={pending}
					onConfirm={onDelete}
				>
					<Button
						variant="ghost"
						className="p-3 cursor-pointer text-sm w-full justify-start font-normal hover:text-red-500"
					>
						<Trash2 className="h-4 w-4 mr-2" /> Delete
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
