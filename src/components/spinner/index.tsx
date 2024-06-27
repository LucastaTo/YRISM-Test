import { FC } from 'react';
import { Oval } from 'react-loader-spinner';

export interface IProps extends Omit<any, 'type'> {
  className?: string;
  variant?: 'border' | 'grow';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'Audio' | 'BallTriangle' | 'Bars' | 'Circles' | 'Grid' | 'Hearts' | 'Oval' | 'Puff' | 'Rings' | 'TailSpin' | 'ThreeDots' | 'Watch' | 'RevolvingDot' | 'Triangle' | 'Plane' | 'MutatingDots' | 'CradleLoader';
}

export const Spinner: FC<IProps> = ({
  className,
  size = 'md',
  color = 'primary',
  type = 'Oval',
  ...restProps
}) => {
  const sizeValue = (() => {
    switch (size) {
      case 'xs':
        return 'w-4 h-4'; // Equivalent to 16px based on Tailwind's sizing
      case 'sm':
        return 'w-6 h-6'; // Equivalent to 24px based on Tailwind's sizing
      case 'md':
        return 'w-8 h-8'; // Equivalent to 32px based on Tailwind's sizing
      case 'lg':
        return 'w-10 h-10'; // Equivalent to 40px based on Tailwind's sizing
      case 'xl':
        return 'w-12 h-12'; // Equivalent to 48px based on Tailwind's sizing
      default:
        return 'w-8 h-8'; // Default to md size
    }
  })();

  const colorClassName = (() => {
    switch (color) {
      case 'primary':
        return 'text-primary'; // Replace with Tailwind class if 'primary' color is defined
      case 'secondary':
        return 'text-secondary'; // Replace with Tailwind class if 'secondary' color is defined
      // Add other color mappings as needed
      default:
        return 'text-primary'; // Default to primary color
    }
  })();

  return (
    <Oval
      color={colorClassName}
      height={sizeValue}
      width={sizeValue}
      {...restProps}
    />
  );
};
