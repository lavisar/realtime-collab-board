import React from 'react';
import { Sidebar } from './_components/sidebar';
import { OrgSidebar } from './_components/org-sidebar';
import { Navbar } from './_components/navbar';
import { BugReportButton } from '@/components/bug-report-button';

interface DashboardLayoutProps {
	children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<main className="h-full">
			<Sidebar />
			<div className="pl-[60px] h-full">
				<div className="flex gap-x-3 h-full">
					<OrgSidebar />
					<div className="h-full flex-1 relative">
						<Navbar />
						{children}
						<BugReportButton />
					</div>
				</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
