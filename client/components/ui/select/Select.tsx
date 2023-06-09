import { FC } from 'react';

interface ISelectProps {
	options: { name: string, value: string }[],
	defaultValue: string;
	value: string;
	onChange: any;
}

const Select: FC<ISelectProps> = ({ options, defaultValue, value, onChange }) => {
	return (
		<select
		 	className='py-1 mr-2'
			value={value}
			onChange={(e) => onChange(e.target.value)}
			>
			<option disabled value={''}>{defaultValue}</option>
			{options.map((option) =>
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			)}
		</select>
	);
};

export default Select;