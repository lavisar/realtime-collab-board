'use client';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

export const Navbar = () => {
	return (
		<div className="flex items-center gap-x-4 p-5 bg-green-500">
			<div className="hidden lg:flex-1 lg:flex">
				{/*//TODO: Add search */}
			</div>
			<UserButton />
		</div>
	);
};
