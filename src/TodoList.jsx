import { Todo } from './Todo'

export function TodoList({ todos }) {
  const sortedTodos = todos.toSorted((a, b) => Number(a.done) - Number(b.done))
  const todoElements = sortedTodos.map((todo) => (
    <li key={todo.key}>
      <Todo todo={todo} />
    </li>
  ))

  return <ul className="flex flex-col divide-y">{todoElements}</ul>
}
