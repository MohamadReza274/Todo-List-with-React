interface Props {
    data: string[];
    className?: string;
    name?: string;
}

const Select = ({data, className, name}: Props) => {
    return (
        <select name={name} className={`select ${className}`}>
            {data.map(value => <option key={value}>{value}</option>)}
        </select>
    );
};

export default Select;