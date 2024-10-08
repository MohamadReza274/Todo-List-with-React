import {useState} from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTodoStore} from "../store.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog.tsx";
import {Button} from "@/Components/ui/button.tsx";
import {Label} from "@/Components/ui/label.tsx";
import {Input} from "@/Components/ui/input.tsx";

const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(16),
    deadline: z.string().date("Invalid date format or empty"),
})

type InputTypes = z.infer<typeof schema>;

const AddTodo = () => {

    const addTodo = useTodoStore(state => state.addTodo)
    const [open, setOpen] = useState(false)

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<InputTypes>({resolver: zodResolver(schema)})

    const onSubmit: SubmitHandler<InputTypes> = (values) => {
        const todoId = Math.floor(Math.random() * 1000);
        addTodo({...values, id: todoId});
        reset();
    }

    const handleModalChange = () => {
        setOpen(!open);
    }

    const handleSubmitButton = () => {
        if (isValid)
            setOpen(false);
        if (!isValid)
            setOpen(true);
    }

    return (
        <Dialog open={open} onOpenChange={handleModalChange}>
            <DialogTrigger asChild>
                <Button onClick={handleModalChange} variant="default">
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                    <DialogTitle>Add Todo</DialogTitle>
                    <DialogDescription>
                        Fill inputs and click add button to save changes.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title:
                        </Label>
                        <Input
                            {...register("title")}
                            id="title"
                            type="text"
                            className="col-span-3 -mb-3"
                        />
                        <span
                            className={'indent-14 text-red-700 text-center col-span-4'}>{errors.title?.message && errors.title.message}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description:
                        </Label>
                        <Input
                            {...register("description")}
                            type={"text"}
                            id="description"
                            className="col-span-3"
                        />
                        <span
                            className={'indent-14 text-red-700 text-center col-span-4'}>{errors.description?.message && errors.description.message}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline:
                        </Label>
                        <Input
                            {...register("deadline")}
                            type={"date"}
                            id="deadline"
                            className="col-span-3"
                        />
                        <span
                            className={'indent-14 text-red-700 text-center col-span-4'}>{errors.deadline?.message && errors.deadline.message}</span>
                    </div>
                    <Button onClick={handleSubmitButton} type="submit">Add</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddTodo;

