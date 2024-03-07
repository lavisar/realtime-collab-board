'use client';
import React from 'react';
import { useOrganization } from '@clerk/nextjs';

import { EmplyOrg } from './_components/emply-org';
import { BoardList } from './_components/board-list';

interface DashboardPageProps {
	searchParams: {
		search?: string;
		favorites?: string;
	};
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
	const { organization } = useOrganization();

	return (
		<div className="flex-1 h-[calc(100%-80px)] p-6">
			{!organization ? <EmplyOrg /> : <BoardList orgId={organization.id} query={searchParams}/>}
		</div>
	);
};

export default DashboardPage;
