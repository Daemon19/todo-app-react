/* eslint-disable react/prop-types */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  FaPlus,
  FaRegCircle,
  FaRegCircleCheck,
  FaRegTrashCan,
} from 'react-icons/fa6'

const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      toggleDone: (todoKey) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.key === todoKey ? { ...todo, done: !todo.done } : todo
          ),
        })),
      deleteTodo: (todoKey) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.key !== todoKey),
        })),
    }),
    {
      name: 'todos-storage',
    }
  )
)

function App() {
  const todos = useStore((state) => state.todos)
  const addTodo = useStore((state) => state.addTodo)

  const handleAddTodo = (todo) => {
    addTodo({ key: window.crypto.randomUUID(), body: todo, done: false })
  }

  return (
    <>
      <div className="mx-auto p-5 pb-24 max-w-screen-sm flex flex-col gap-3">
        <h1 className="relative w-fit mx-auto text-6xl font-bold text-center py-5 px-2 after:absolute after:content-[''] after:block after:h-1 after:w-full after:bg-black after:top-[58%] after:left-0">
          Todos
        </h1>
        <TodoList todos={todos} />
        <TodoForm onAddTodo={handleAddTodo} />
      </div>
    </>
  )
}

function TodoList({ todos }) {
  const sortedTodos = todos.toSorted((a, b) => Number(a.done) - Number(b.done))
  const todoElements = sortedTodos.map((todo) => (
    <li key={todo.key}>
      <Todo todo={todo} />
    </li>
  ))

  return <ul className="flex flex-col divide-y">{todoElements}</ul>
}

function Todo({ todo }) {
  const { key, body, done } = todo

  const toggleDone = useStore((state) => state.toggleDone)
  const deleteTodo = useStore((state) => state.deleteTodo)

  const handleToggleDone = () => {
    toggleDone(key)
  }

  const handleDeleteTodo = () => {
    deleteTodo(key)
  }

  return (
    <div className="flex gap-x-3 w-full py-5 group">
      <button
        onClick={handleToggleDone}
        className="text-xl text-gray-400 hover:text-black transition-all ease-in"
      >
        {done ? <FaRegCircleCheck /> : <FaRegCircle />}
      </button>
      <p
        // Tailwindcss's "break-words" class will not work ¯\_(ツ)_/¯
        style={{
          wordBreak: 'break-word',
        }}
        className={'w-full ' + (done ? 'line-through ' : '')}
      >
        {body}
      </p>
      <button
        onClick={handleDeleteTodo}
        className="text-xl text-red-600 invisible group-hover:visible"
      >
        <FaRegTrashCan />
      </button>
    </div>
  )
}

function TodoForm({ onAddTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onAddTodo(formData.get('todo'))
    e.target.reset()
  }

  return (
    <>
      <form className="flex gap-1 w-full" onSubmit={handleSubmit}>
        <input
          name="todo"
          type="text"
          required
          autoComplete='off'
          placeholder="Count the stars..."
          className="block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FaPlus className="inline" /> Add todo
        </button>
      </form>
    </>
  )
}

export default App

