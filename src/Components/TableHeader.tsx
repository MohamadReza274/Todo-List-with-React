interface Props {
    data: string[];
}

const TableHeader = ({data}: Props) => {
    return (
        <thead>
        <tr>
            {
                data.map(value => <th key={value}>{value}</th>)
            }
        </tr>
        </thead>
    );
};

export default TableHeader;