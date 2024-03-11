import { useState } from 'react';
import { useMutation } from 'convex/react';
import { FunctionReference } from 'convex/server';

/**
 * @description A hook to use a mutation from the API
 * @params convex's mutation
 */
export const useApiMutation = (
	mutationFunction: FunctionReference<'mutation'>
) => {
	const [pending, setPending] = useState(false);
	const apiMution = useMutation(mutationFunction);

	const mutate = (playload: any) => {
		setPending(true);
		return apiMution(playload)
			.finally(() => setPending(false))
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			});
	};

	return {
		mutate,
		pending,
	};
};
