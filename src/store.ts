import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

interface Todo {
    id: number;
    title: string;
    description: string;
    deadline: string;
}

interface StoreType {
    todo: Todo[];
    addTodo: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    // updateTodo: (id: number, data: Todo) => void;
}

export const useTodoStore = create<StoreType>()(devtools(persist((set) => ({
    todo: [{
        id: 1,
        title: "React Todo App",
        description: "Create a react todo app with zustand and react-hook-form",
        deadline: "8/23/2024"
    }],
    addTodo: (t) => set((state) => (
        {todo: [...state.todo, t]})),
    deleteTodo: (id) => set((state) => {
        const filteredTodos = state.todo.filter(todo => todo.id !== id);
        return {todo: filteredTodos}
    }),
    // updateTodo: (id, data) => set((state: { todo }) => (state.todo.map((t) => (t.id === id ? {...data} : t))))
}), {name: "todo-store"})))