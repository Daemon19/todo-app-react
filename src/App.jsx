/* eslint-disable react/prop-types */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FaPlus, FaXmark } from 'react-icons/fa6'

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
      <div className="mx-auto p-5 max-w-screen-sm flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-center py-5">Todos</h1>
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

  return <ul className="max-h-96 flex flex-col gap-y-3">{todoElements}</ul>
}

function Todo({ todo }) {
  const { key, body, done } = todo

  const toggleDone = useStore((state) => state.toggleDone)
  const deleteTodo = useStore((state) => state.deleteTodo)

  const handleContextmenu = (e) => {
    e.preventDefault()
    toggleDone(key)
  }

  const handleDeleteTodo = () => {
    deleteTodo(key)
  }

  return (
    <div
      className={
        'flex ring-1 ring-gray-200 rounded-lg ' +
        (done ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50 ')
      }
    >
      <button
        onClick={handleDeleteTodo}
        className="text-xl z-10 bg-white hover:bg-red-500 text-red-500 hover:text-white size-10 ring-1 ring-red-500"
      >
        <FaXmark className="mx-auto" />
      </button>
      <p
        onContextMenu={handleContextmenu}
        className={
          'basis-full pl-3 align-middle' + (done ? ' line-through ' : '')
        }
      >
        {body}
      </p>
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
      <form className="flex gap-1 pb-3 w-full" onSubmit={handleSubmit}>
        <input
          name="todo"
          type="text"
          required
          placeholder="Count the stars..."
          className="basis-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="basis-1/6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FaPlus className="mx-auto" />
        </button>
      </form>
    </>
  )
}

export default App

