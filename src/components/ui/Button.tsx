import { cn } from '../../utils/cn';
import type { ComponentProps } from 'react';
import FlipText from './FlipText';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) => {
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg shadow-[#2D6A4F]/20",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300",
        outline: "bg-transparent hover:bg-brand-green-600 text-white hover:text-black border-2 border-brand-green-600",
        ghost: "bg-transparent hover:bg-green-50 text-[#2D6A4F]"
    };

    const sizes: Record<ButtonSize, string> = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-7 py-3 text-base",
        lg: "px-10 py-4 text-lg"
    };

    return (
        <button
            className={cn(
                "group rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
                "active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            <FlipText hoverColor={variant === 'primary' ? 'text-white' : 'text-[#2D6A4F]'}>
                {children}
            </FlipText>
        </button>
    );
};

export default Button;
