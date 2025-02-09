import { useQuery } from '@tanstack/react-query';
import Application from '../interfaces'
import { getApplications } from '../api/applications';
import { queryClient } from '../api/queryClient';

type Response = {
    data: Application[] | undefined;
    isError: boolean;
    isLoading: boolean;
}

export const useApplications = ():Response => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn: getApplications,
    }, queryClient);

    return { data, isError, isLoading };
}