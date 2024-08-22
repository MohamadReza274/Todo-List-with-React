import {CalendarDaysIcon, DocumentTextIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";
import Select from "./Select.tsx";
import TableHeader from "./TableHeader.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import moment from "moment";


const categories = ["This Week", "Last Week", "Last Month"];

const headers = ["Title", "Description", "Deadline"];

const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    deadline: z.string().date(),
})

type InputTypes = z.infer<typeof schema>

const TodoList = () => {

    const [data, setData] = useState([{
        title: "Todo List Project",
        description: "Create a todo list application with React and React-hook-form Library",
        deadline: moment("8/20/2024").format("ll")
    }]);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<InputTypes>({
        resolver: zodResolver(schema),
    });

    const handleDeleteItem = (index: number) => {
        const newData = [
            ...data.slice(0, index), // Elements before the one to delete
            ...data.slice(index + 1) // Elements after the one to delete
        ]
        setData(newData);
    }

    const onSubmit: SubmitHandler<InputTypes> = (values) => {
        setData([...data, values]);
        reset();
    }

    return (
        <div className={'p-4'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Todo</h2>
                <div className="form-control relative w-full my-4">
                    <input type={"text"} {...register("title")}
                           className={`input input-lg max-w-full pl-10 ${errors.title?.message && "input-error"}`}
                           placeholder={"Title"}/>

                    <span className="absolute inset-y-0 left-3 inline-flex items-center">
			<DocumentTextIcon className={"w-5 h-5"}/>
		</span>
                </div>
                <div className="form-control relative w-full my-4">
                    <input type={"text"} {...register("description")}
                           className={`input input-lg max-w-full pl-10 ${errors.description?.message && "input-error"}`}
                           placeholder={"Description"}/>

                    <span className="absolute inset-y-0 left-3 inline-flex items-center">
			<DocumentTextIcon className={"w-5 h-5"}/>
		</span>
                </div>

                <div className="form-control relative w-full my-4">
                    <input type={"date"} {...register("deadline")}
                           className={`input input-lg max-w-full pl-10 ${errors.deadline?.message && "input-error"}`}
                           placeholder={"Deadline"}/>

                    <span className="absolute inset-y-0 left-3 inline-flex items-center">
			<CalendarDaysIcon className={"w-5 h-5"}/>
		</span>
                </div>

                <button className={"btn btn-outline block my-4"}><PlusIcon className={"w-5 h-5"}/></button>
            </form>

            <Select className={"my-2"} data={categories}/>
            <div className="flex w-full overflow-x-auto">
                <table className={'table'}>
                    <TableHeader data={headers}/>
                    <tbody>
                    {data.length === 0 && <h4 className={"p-2 text-lg"}>There is no data.</h4>}
                    {data.map((value, i) => <tr key={i}>
                        <td>{value.title}</td>
                        <td>{value.description.substring(0, 15)}...</td>
                        <td>{moment(value.deadline).format("ll")}</td>
                        <td>
                            <button onClick={() => handleDeleteItem(i)}><TrashIcon
                                className={"w-5 h-5 text-error"}/></button>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>

            <h2>{}</h2>

        </div>
    );
};

export default TodoList;