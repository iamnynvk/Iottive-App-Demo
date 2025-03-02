export interface IHeaderProps {
  isBack?: boolean;
  isLogo?: boolean;
  isClose?: boolean;
  isAction?: boolean;
  title?: string;
  onClose?: () => {};
  onAction?: () => {};
}

export interface IUserItem {
  name: string;
  email: string;
  password: string;
}
