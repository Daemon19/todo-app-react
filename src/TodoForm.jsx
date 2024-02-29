import { FaPlus } from 'react-icons/fa6'

export function TodoForm({ onAddTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onAddTodo(formData.get('todo'))
    e.target.reset()
  }

  return (
    <>
      <form className="flex gap-1 w-full" onSubmit={handleSubmit}>
        <input
          name="todo"
          type="text"
          required
          autoComplete="off"
          placeholder="Count the stars..."
          className="block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FaPlus className="inline" /> Add todo
        </button>
      </form>
    </>
  )
}
