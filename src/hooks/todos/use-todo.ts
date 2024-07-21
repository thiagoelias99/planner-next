import { useMutation, useQuery } from 'react-query'
import useToken from '../use-token'
import { CreateTodoDto, ToDoItem, Todo } from '@/models/todos/todo'
import axios from 'axios'
import { api } from '@/services/api/api'
import { todo } from 'node:test'
import { Item } from '@radix-ui/react-select'
import { addHours } from 'date-fns'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const useToDos = () => {
  const { token } = useToken()

  const getToDos = useQuery(['todos'], async () => {
    if (!token) {
      return
    }

    const timezoneOffset = new Date().getTimezoneOffset() / 60
    const response = await api.get<Todo>('/todos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    //Correct the timezone offset
    const items = response.data.items.map((item: ToDoItem) => {
      let date = new Date(item.date)
      date = addHours(date, timezoneOffset)
      return {
        ...item,
        date
      }

    })

    const response2 = {...response.data, items}

    console.log(response2)
    return response2
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