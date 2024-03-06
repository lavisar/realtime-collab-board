import React from 'react';
import { NewButton } from './new-button';
import { List } from './list';

export const Sidebar = () => {
	return (
		<aside className="fixed z-[1] left-0 bg-blue-950 text-white h-full w-[60px] p-3 flex flex-col gap-y-4">
			<List />
			<NewButton />
		</aside>
	);
};
