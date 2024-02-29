import { FaRegCircle, FaRegCircleCheck, FaRegTrashCan } from 'react-icons/fa6'
import { useStore } from './useStore'

export function Todo({ todo }) {
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
