import CardCom from "./Components/Card.tsx";
import {useTodoStore} from "./store.ts";
import AddTodo from "@/Components/AddTodo.tsx";


const App = () => {

    const todos = useTodoStore(state => state.todo);

    return (
        <div className="p-4 flex flex-col justify-center w-[100vw] max-w-[480px]">
            <h1 className={"text-3xl font-bold mb-2"}>To-do List </h1>
            <div className={"p-2"}>
                <div className="flex justify-between">
                    <div>
                        <h2 className={"text-2xl"}>My Tasks</h2>
                        <p className={"pt-2"}>You have {todos.length} Tasks Left!</p>
                    </div>
                    <AddTodo/>
                </div>

                {todos.length === 0 ? <p className={"px-2 py-4 text-xl"}>There is no Todo for now!</p> : todos?.map((todo) => (
                    <CardCom key={todo.id} data={todo}/>))}
            </div>
        </div>
    );
};

export default App;

