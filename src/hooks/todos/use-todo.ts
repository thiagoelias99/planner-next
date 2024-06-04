import { useMutation, useQuery } from 'react-query'
import useToken from '../use-token'
import { CreateTodoDto, ToDoItem, Todo } from '@/models/todos/todo'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const useToDos = () => {
  const { token } = useToken()

  const getToDos = useQuery(['todos'], async () => {
    if (!token) {
      return
    }

    const response = await fetch(`${apiUrl}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.json() as Promise<Todo>
  })

  const createTodo = useMutation({
    mutationFn: async (todo: CreateTodoDto) => {
      if (!token) {
        return
      }

      await axios.post(`${apiUrl}/todos`, todo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getToDos.refetch()
    }
  })

  const updateTodo = useMutation({
    mutationFn: async ({ id, ...rest }: Partial<ToDoItem>) => {
      if (!token) {
        return
      }

      await axios.patch(`${apiUrl}/todos`, {
        id,
        date: new Date(),
        ...rest
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getToDos.refetch()
    }
  })

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        return
      }

      await axios.delete(`${apiUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          id
        }
      })

      getToDos.refetch()
    }
  })

  return {
    getToDos,
    updateTodo,
    createTodo,
    deleteTodo
  }
}

export default useToDos