import { useQuery } from '@tanstack/react-query';
import { getSmsMessages } from '../actions/sms.actions';

export const test = 123;

export function useGetSmsMessages(pageSize: number, nextPageToken?: string) {
  return useQuery({
    queryKey: ['smsMessages', pageSize, nextPageToken],
    queryFn: async () => {
      const data = await getSmsMessages(pageSize, nextPageToken);

      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
