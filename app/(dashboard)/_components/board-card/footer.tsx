import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface FooterProps {
	isFavorite: boolean;
	title: string;
	authorLabel: string;
	createdAtLabel: string;
	onCLick: () => void;
	disabled: boolean;
}

export const Footer = ({
	isFavorite,
	title,
	authorLabel,
	createdAtLabel,
	onCLick,
	disabled,
}: FooterProps) => {
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// ? prevent from triggering navigate
		e.stopPropagation();
		e.preventDefault();
		onCLick();
	};
	return (
		<div className="relative bg-white p-3">
			<p className="text-[13px] truncate max-w-[calc(100%-20px)]">
				{title}
			</p>
			<p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
				{authorLabel}, {createdAtLabel}
			</p>
			<button
				disabled={disabled}
				onClick={(e) => handleClick(e)}
				className={cn(
					'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-red-600',
					disabled && 'cursor-not-allowed opacity-75'
				)}
			>
				<Heart
					className={cn(
						'h-4 w-4',
						isFavorite && 'fill-red-600 text-red-600'
					)}
				/>
			</button>
		</div>
	);
};
