/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react'
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
      <Multiplier />
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

function Multiplier() {
  const [number, setNumber] = useState(0)
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])

  const [dark, setDark] = useState(false)
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
    }
  }, [dark])

  useEffect(() => {
    console.log('Theme changed!')
  }, [themeStyles])

  return (
    <>
      <br />
      <input
        type="number"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <br />
      <button onClick={() => setDark(!dark)}>Change theme</button>
      <p style={themeStyles}>{doubleNumber}</p>
    </>
  )
}

function slowFunction(a) {
  for (let i = 0; i < 200000000; i++) {}
  return a * 2
}

export default App

