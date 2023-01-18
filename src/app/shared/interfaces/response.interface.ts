export type MessageResponse = 'SUCCESS' | 'FAILED' | string;

export interface Response<T> {
  status: number;
  message: MessageResponse;
  data: T;
}
