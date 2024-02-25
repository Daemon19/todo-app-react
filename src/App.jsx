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
      toggleDone: (todoKey) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.key === todoKey ? { ...todo, done: !todo.done } : todo
          ),
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
      <TodoList todos={todos} />
      <TodoForm onAddTodo={handleAddTodo} />
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

  return <ul>{todoElements}</ul>
}

function Todo({ todo }) {
  const { key, body, done } = todo

  const toggleDone = useStore((state) => state.toggleDone)
  const handleContextmenu = (e) => {
    e.preventDefault()
    toggleDone(key)
  }

  const style = {
    color: done ? '#00e000' : 'black',
  }

  return (
    <p style={style} onContextMenu={handleContextmenu}>
      {body}
    </p>
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="todo" />
      <button type="submit">Add todo</button>
    </form>
  )
}

export default App

