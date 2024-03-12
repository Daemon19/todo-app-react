import useSWR from 'swr'

export default function useTodos() {
  return useSWR('/todos', async (url) => {
    const res = await fetch(new URL(url, import.meta.env.VITE_TODO_API_URL))
    const body = await res.json()
    const todos = body.data.map(({ id, attributes }) => ({ id, ...attributes }))
    return todos
  })
}
