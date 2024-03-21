import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ModalProvider } from '@/providers/modal-provider';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { Loading } from '@/components/auth/loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Draw together',
	description: 'draw-together-dev.vercel.app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Suspense fallback={<Loading />}>
					<ConvexClientProvider>
						<Toaster />
						<ModalProvider />
						{children}
					</ConvexClientProvider>
				</Suspense>
			</body>
		</html>
	);
}
