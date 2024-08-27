import {TrashIcon} from "lucide-react";
import {Button} from "@/Components/ui/button.tsx";


interface Props {
    onDelete?: () => void;
}

const DeleteTodo = ({onDelete}: Props) => {
    return (
        <Button variant={"link"} onClick={onDelete} className={"my-2"}><TrashIcon
            className={"w-5 h-5 text-error"}/></Button>
    );
};

export default DeleteTodo;