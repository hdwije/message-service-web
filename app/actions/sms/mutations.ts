import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../configs/axios.configs';
import { Sms } from '@/app/common/types';

export function useSendSms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipient,
      message,
    }: {
      recipient: string;
      message: string;
    }): Promise<Sms> => {
      const response = await axiosInstance.post('/sms/send', {
        to: recipient,
        message,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sms'] });
    },
  });
}
