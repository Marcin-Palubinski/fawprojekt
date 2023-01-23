import { FC } from 'react';
import Link from 'next/link';
import { ButtonProps } from 'global';

const Button: FC<ButtonProps> = ({
	children,
	className,
	onClick,
	href,
	icon,
	disabled,
	type
}) => {
	const classes = `flex items-center gap-4 px-3 py-2 hover:bg-primary rounded focus:bg-primary active:bg-primary-hover bg-neutral-700/50 text-base tracking-wide justify-center font-semibold disabled:opacity-50 disabled:bg-neutral-700/50 ${className ? className : ''
		} ${icon ? 'pr-4' : ''}`;
	if (href) {
		return (
			<Link
				href={href}
				className={`${classes} w-max`}
				onClick={onClick}
			>
				{icon}
				{children}
			</Link>
		);
	}
	return (
		<button
			className={classes}
			onClick={onClick}
			disabled={disabled}
			type={type || 'button'}
		>
			{icon}
			{children}
		</button>
	);
};

export default Button;
