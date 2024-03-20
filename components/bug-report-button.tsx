import Link from 'next/link';
import { Hint } from './hint';
import { Button } from './ui/button';
import { Bug } from 'lucide-react';

export const BugReportButton = () => (
	<Hint label="Report a bug" side="left">
		<Button
			asChild
			className="px-2 absolute bottom-10 right-8 rounded-full bg-blue-500/20 text-blue-800 shadow-md border hover:border-blue-500"
			variant="board"
			size="icon"
		>
			<Link
				href="mailto:lavisar.dev@gmail.com?subject=DRAW-TOGETHER%20REPORT%20BUG"
				target="_blank"
			>
				<Bug />
			</Link>
		</Button>
	</Hint>
);
