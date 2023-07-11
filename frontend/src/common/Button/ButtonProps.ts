export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'normal';

export interface ButtonProps {
  children: string;
  size: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick: () => void;
}
