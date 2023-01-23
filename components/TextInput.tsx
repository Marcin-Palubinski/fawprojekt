import { FC } from 'react';
import { TextInputProps } from 'global';

const TextInput: FC<TextInputProps> = ({
	placeholder,
	name,
	value,
	onClick,
	className,
	disabled,
}) => {
	const classes = `${className} flex items-center justify-center gap-x-2 rounded-md border-2 border-neutral-700 bg-neutral-700/50 p-3 outline-none transition placeholder:text-neutral-400 hover:border-primary focus:border-primary focus:bg-neutral-600/50 active:border-primary active:bg-neutral-600/50 disabled:opacity-50 disabled:bg-neutral-700/50 disabled:border-none`;
	return (
		<textarea
			placeholder={placeholder}
			name={name}
			value={value ?? undefined}
			className={classes}
			onClick={onClick}
			disabled={disabled}
		/>
	);
};

export default TextInput;
