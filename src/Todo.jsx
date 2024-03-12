import {
  FaCircleCheck,
  FaRegCircle,
  FaRegPenToSquare,
  FaRegTrashCan
} from 'react-icons/fa6'
import { useStore } from './useStore'
import { useState } from 'react'
import { TodoEdit } from './TodoEdit'

export function Todo({ todo }) {
  const { id, title } = todo
  // TODO: add done property to todos at the backend
  const done = false

  const [isEditing, setIsEditing] = useState(false)

  const toggleDone = useStore((state) => state.toggleDone)
  const deleteTodo = useStore((state) => state.deleteTodo)
  const editTodo = useStore((state) => state.editTodo)

  const handleToggleDone = () => {
    toggleDone(id)
  }

  const handleEditTodo = () => {
    setIsEditing(true)
  }

  const handleDeleteTodo = () => {
    deleteTodo(id)
  }

  const handleSaveEdit = (newTitle) => {
    editTodo(id, newTitle)
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
            {done ? <FaCircleCheck /> : <FaRegCircle />}
          </button>
          <p
            // Tailwindcss's "break-words" class will not work ¯\_(ツ)_/¯
            style={{
              wordBreak: 'break-word'
            }}
            className={'w-full ' + (done ? 'line-through ' : '')}
          >
            {title}
          </p>
          <button
            onClick={handleEditTodo}
            className="text-xl text-gray-600 rounded-lg p-2 invisible transition ease-in duration-75 group-hover:visible hover:bg-gray-100"
          >
            <FaRegPenToSquare />
          </button>
          <button
            onClick={handleDeleteTodo}
            className="text-xl text-red-600 rounded-lg p-2 invisible transition ease-in duration-75 group-hover:visible hover:bg-gray-100"
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
