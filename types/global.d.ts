declare module 'global' {
	interface User {
		id: string | number;
		name: string;
		email?: string;
		image?: string;
		createdAt?: string;
		role: string;
	}
	type ButtonProps = {
		icon?: React.ReactNode;
		className?: string;
		href?: string;
		disabled?: boolean;
		children?: React.ReactNode;
		onClick?: () => void;
		type?: 'button' | 'submit' | 'reset';
	};
	type InputProps = {
		icon?: React.ReactNode;
		className?: string;
		disabled?: boolean;
		type?: string;
		name?: string;
		value?: string;
		label?: string;
		placeholder?: string;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onClick?: () => void;
	};
	type TextInputProps = InputProps & {
		error?: string;
	};
}
