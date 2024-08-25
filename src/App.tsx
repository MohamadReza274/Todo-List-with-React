import CardCom from "./Components/Card.tsx";
import {useTodoStore} from "./store.ts";


const App = () => {

    const todos = useTodoStore(state => state.todo);
    console.log(todos)
    const addTodo = useTodoStore(state => state.addTodo);

    return (
        <div className="p-4">

            <h1 className={"text-3xl font-bold mb-2"}>To-do List </h1>
            <div className={"p-2"}>

                <div className="flex justify-between">

                    <div>

                        <h2 className={"text-2xl"}>My Tasks</h2>

                        <p className={"pt-2"}>You have {todos.length} Tasks Left!</p>

                    </div>

                    <button onClick={() => {

                        addTodo({

                            id: 2,

                            title: "Next.js app for job",

                            description: "Next.js and mongodb app",

                            deadline: "9/12/2024"

                        })

                    }} className={"btn"}>Add Task
                    </button>
                </div>

                {todos?.map((todo) => (<CardCom key={todo.id} data={todo}/>))}

            </div>

            {/*<AddTodo />*/}
        </div>
    );
};

export default App;

