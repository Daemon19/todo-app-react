/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])

  const handleAddTodo = (todo) => {
    setTodos([...todos, { key: window.crypto.randomUUID(), body: todo }])
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

function useLocalStorage(storageKey, fallbackState) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  )
  const stateSetter = (newState) => {
    localStorage.setItem(storageKey, JSON.stringify(newState))
    setState(newState)
  }
  return [state, stateSetter]
}

export default App
