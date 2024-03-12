import { FaPlus } from 'react-icons/fa6'
import useTodos from './hooks/useTodos'

export function TodoForm() {
  const { mutate } = useTodos()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const res = await fetch(
      new URL('/todos', import.meta.env.VITE_TODO_API_URL),
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: formData.get('title') })
      }
    )
    const body = await res.json()
    const todo = { id: body.data.id, title: body.data.attributes.title }
    mutate((todos) => [...todos, todo])
    e.target.reset()
  }

  return (
    <>
      <form className="flex gap-1 w-full" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          required
          autoComplete="off"
          placeholder="Count the stars..."
          className="flex-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
