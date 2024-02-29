import { FaFloppyDisk } from 'react-icons/fa6'

export function TodoEdit({ todo, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onSave(formData.get('todo'))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full sm:flex-row"
    >
      <input
        name="todo"
        type="text"
        required
        autoFocus
        autoComplete="off"
        defaultValue={todo.body}
        className="block flex-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-3 py-1.5 text-sm leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FaFloppyDisk /> Save
        </button>
      </div>
    </form>
  )
}
