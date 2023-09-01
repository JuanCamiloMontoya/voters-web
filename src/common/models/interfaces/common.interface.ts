export interface ErrorMsgResponse {
  message: string;
}

export interface IEmail {
  email: string;
}

export interface ISuccessCallback {
  onSuccess: () => void;
}

export interface IGeneralData {
  id: number;
  name: string;
}

export interface ISuccessResponse {
  success: boolean;
}
