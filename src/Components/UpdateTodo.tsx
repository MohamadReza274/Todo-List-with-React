import {z} from "zod";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTodoStore} from "@/store.ts";
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
import {FilePenLine} from "lucide-react";


const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(16),
    deadline: z.string().date("Invalid date format or empty"),
})

type InputTypes = z.infer<typeof schema>;

interface Props extends InputTypes {
    todo: InputTypes & { id: number }
}

const UpdateTodo = ({todo}: Props) => {

    const [open, setOpen] = useState(false);
    const updateTodo = useTodoStore(state => state.updateTodo)

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<InputTypes>({resolver: zodResolver(schema), defaultValues: {...todo}})

    const onSubmit: SubmitHandler<InputTypes> = (values) => {
        updateTodo(todo.id, {...values, id: todo.id})
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
                <Button onClick={handleModalChange} variant="link" size="icon">
                    <FilePenLine color={"blue"} className="h-4 w-4"/>
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

export default UpdateTodo;