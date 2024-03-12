import { TodoList } from './TodoList'
import { TodoForm } from './TodoForm'

function App() {
  return (
    <>
      <div className="mx-auto p-5 pb-24 max-w-screen-sm flex flex-col gap-3">
        <h1 className="relative w-fit mx-auto text-6xl font-bold text-center py-5 px-2 after:absolute after:h-1 after:w-full after:bg-black after:top-[50%] after:left-0">
          Todos
        </h1>
        <TodoList />
        <TodoForm />
      </div>
    </>
  )
}

export default App
