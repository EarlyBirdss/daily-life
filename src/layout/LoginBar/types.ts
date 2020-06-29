export interface UserInfo {
  userId: string,
  userName: string,
  password?: string,
};

export interface LoginModalProps {
  visible: boolean,
  type: string,
  form: any,
  onClose: any,
};

export interface FormUserInfo {
  userName: string,
  password: string | undefined | null
};
