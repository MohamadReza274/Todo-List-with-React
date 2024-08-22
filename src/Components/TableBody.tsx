import {TrashIcon} from "@heroicons/react/24/outline";


const TableBody = () => {
    return (
        <tbody>
        <tr>
            <td>Milk</td>
            <td>5.00$</td>
            <td>Groceries</td>
            <td>
                <button><TrashIcon className={"w-5 h-5 text-error"}/></button>
            </td>
        </tr>
        </tbody>
    );
};

export default TableBody;