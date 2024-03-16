import { Todo } from './Todo'
import { LoadingSpinner } from './components/ui/loading-spinner'
import useTodos from './hooks/useTodos'

export function TodoList() {
  const { data: todos, error, isLoading } = useTodos()

  if (error) {
    return <p>Failed to load todos.</p>
  }
  if (isLoading) {
    return <LoadingSpinner className="mx-auto size-16" />
  }

  const sortedTodos = todos.toSorted((a, b) => Number(a.done) - Number(b.done))
  const todoElements = sortedTodos.map((todo) => (
    <li key={todo.id}>
      <Todo todo={todo} />
    </li>
  ))

  return <ul className="flex flex-col divide-y">{todoElements}</ul>
}
