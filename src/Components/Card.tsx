import {useTodoStore} from "../store.ts";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.tsx";
import {Button} from "@/Components/ui/button.tsx";
import {Checkbox} from "@/Components/ui/checkbox.tsx";
import {FilePenLine, TrashIcon} from "lucide-react";
import {ChangeEvent, useState} from "react";

interface Props {
    data: { id: number, title: string, description?: string, deadline: string; };
}


const CardCom = ({data}: Props) => {
    const deleteTodo = useTodoStore(state => state.deleteTodo)
    const [checked, setChecked] = useState(false)

    const handleChecked = () => {
        setChecked(!checked);
    }

    return (
        <Card className="max-w-lg w-full my-4">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center space-x-2">
                        <Checkbox checked={checked} onClick={handleChecked} id="terms"/>
                        <label
                            htmlFor="terms"
                            className={`text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${checked && "line-through"}`}>
                            {data.title}
                        </label>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className={"flex"}>
                <p className={"grow"}>
                    {data.description}
                </p>
                <div className={"flex flex-col"}>
                    <Button variant="link" size="icon">
                        <FilePenLine color={"blue"} className="h-4 w-4"/>
                    </Button>
                    <Button onClick={() => deleteTodo(data.id)} variant="link" size="icon">
                        <TrashIcon color={"red"} className="h-4 w-4"/>
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between -mt-12">
                <p>Due {data.deadline}</p>
            </CardFooter>
        </Card>
    );
};

export default CardCom;