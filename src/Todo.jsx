import {
  FaRegCircle,
  FaRegCircleCheck,
  FaRegPenToSquare,
  FaRegTrashCan,
} from 'react-icons/fa6'
import { useStore } from './useStore'
import { useState } from 'react'
import { TodoEdit } from './TodoEdit'

export function Todo({ todo }) {
  const { key, body, done } = todo

  const [isEditing, setIsEditing] = useState(false)

  const toggleDone = useStore((state) => state.toggleDone)
  const deleteTodo = useStore((state) => state.deleteTodo)
  const editTodo = useStore((state) => state.editTodo)

  const handleToggleDone = () => {
    toggleDone(key)
  }

  const handleEditTodo = () => {
    setIsEditing(true)
  }

  const handleDeleteTodo = () => {
    deleteTodo(key)
  }

  const handleSaveEdit = (newBody) => {
    editTodo(key, newBody)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex gap-x-3 w-full py-5 group">
      {!isEditing ? (
        <>
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
            onClick={handleEditTodo}
            className="text-xl text-gray-600 invisible group-hover:visible"
          >
            <FaRegPenToSquare />
          </button>
          <button
            onClick={handleDeleteTodo}
            className="text-xl text-red-600 invisible group-hover:visible"
          >
            <FaRegTrashCan />
          </button>{' '}
        </>
      ) : (
        <TodoEdit
          todo={todo}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  )
}
