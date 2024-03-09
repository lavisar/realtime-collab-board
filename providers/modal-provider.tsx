'use client';
import { useEffect, useState } from 'react';
import { RenameModal } from '@/components/modal/rename-modal';

export const ModalProvider = () => {
	const [isMounted, setisMounted] = useState(false);

	//? for make sure this component always mounted in server rendering
	//! otherwise will get the hydration error
	useEffect(() => {
		setisMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<>
			<RenameModal />
		</>
	);
};
