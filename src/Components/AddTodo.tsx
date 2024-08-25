import React from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTodoStore} from "../store.ts";

const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(16),
    deadline: z.string().date(),
})

type InputTypes = z.infer<typeof schema>;

const AddTodo = () => {

    const addTodo = useTodoStore(state => state.addTodo)
    // const [open, setOpen] = useState(false)

    const {register, reset, handleSubmit, formState: {errors}} = useForm<InputTypes>({resolver: zodResolver(schema)})

    const onSubmit: SubmitHandler<InputTypes> = (values) => {
        const todoId = Math.floor(Math.random() * 1000);
        addTodo({...values, id: todoId});
        console.log(values)
        reset();
    }

    return (
        <React.Fragment>

        </React.Fragment>
    );
};

export default AddTodo;

