import { Sms } from '@/app/common/types';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../configs/axios.configs';

export function useGetMessages() {
  return useQuery<Sms[]>({
    queryKey: ['sms'],
    queryFn: async (): Promise<Sms[]> => {
      const { data } = await axiosInstance.get('/sms/list');

      return data;
    },
  });
}
