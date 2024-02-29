import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      toggleDone: (todoKey) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.key === todoKey ? { ...todo, done: !todo.done } : todo
          ),
        })),
      deleteTodo: (todoKey) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.key !== todoKey),
        })),
    }),
    {
      name: 'todos-storage',
    }
  )
)
