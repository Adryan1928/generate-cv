import {
    useQuery,
    useMutation,
} from '@tanstack/react-query';
import { createCV, getCV } from '../services/cv';
import { queryClient } from '../QueryClient';

export const QueryKeys = {
    all: ['cv'] as const,
    item: (id: string) => [...QueryKeys.all, id] as const,
}

export const useGetCVQuery = (code: string) => {
    return useQuery({
        queryKey: QueryKeys.item(code),
        queryFn: () => getCV(code),
    });
}

export const useCreateCVMutation = () => {
    return useMutation({
        mutationFn: createCV,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: QueryKeys.all });
        }
    });
};