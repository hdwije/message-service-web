import { Sms } from '@/app/common/types';
import { axiosInstance } from './configs/axios.configs';

export async function getSmsMessages(
  pageSize: number,
  nextPageToken?: string,
): Promise<{ messages: Sms[]; nextPageToken: string }> {
  const url = nextPageToken
    ? `/sms/list?pageSize=${pageSize}&nextPageToken=${nextPageToken}`
    : `/sms/list?pageSize=${pageSize}`;

  const response = await axiosInstance.get(url);

  return response.data;
}
