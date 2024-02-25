/* eslint-disable react/prop-types */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
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
    addTodo({ key: window.crypto.randomUUID(), body: todo })
  }

  return (
    <>
      <TodoList todos={todos} />
      <TodoForm onAddTodo={handleAddTodo} />
    </>
  )
}

function TodoList({ todos }) {
  const todoElements = todos.map(({ key, body }) => {
    return <li key={key}>{body}</li>
  })

  return <ul>{todoElements}</ul>
}

function TodoForm({ onAddTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onAddTodo(formData.get('todo'))
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="todo" />
      <button type="submit">Add todo</button>
    </form>
  )
}

export default App

