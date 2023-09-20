import { EGender } from "../../common/models/enums/gender.enum";
import { ISuccessCallback } from "../../common/models/interfaces/common.interface";
import { IPage } from "../../common/models/interfaces/page.interface";
import { TOrder, TStatus } from "../../common/models/types/common.type";

export type MessagingTypes = "getAllMessages" | "sendMessage";

export interface Message {
  body: string;
}

export interface MessagingState {
  messages: IPage<Message[]>;
  error: {
    getAllMessages?: string | null;
    sendMessage?: string | null;
  };
  status: {
    getAllMessages: TStatus;
    sendMessage: TStatus;
  };
}

export interface GetMessagesAllPayload {
  order?: TOrder;
  current: number;
  pageSize: number;
}

export interface GetMessagesAllResponse extends IPage<Message[]> {}

export interface SendMesssageData {
  message: string;
  minimumAge?: number | null;
  maximumAge?: number | null;
  files?: File[] | File;
  /* gender?: EGender | null;
  subdivisions?: number[] | null;
  occupations?: number[] | null;
  hobbies?: number[] | null; */
}

export interface SendMessagePayload extends ISuccessCallback {
  data: SendMesssageData;
}
