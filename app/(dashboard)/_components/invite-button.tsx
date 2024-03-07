import React from 'react';
import { Plus } from 'lucide-react';
import { OrganizationProfile } from '@clerk/nextjs';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const InviteButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Plus className="w-4 h-4 mr-2" />
					Invite members
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 bg-transparent border-none max-w-[800px]">
				<OrganizationProfile />
			</DialogContent>
		</Dialog>
	);
};
