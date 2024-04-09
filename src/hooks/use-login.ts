const apiUrl = process.env.NEXT_PUBLIC_API_URL
import axios, { AxiosError } from 'axios'
import useToken from './use-token'
import { toast } from './use-toast'
import { useState } from 'react'
import { set } from 'date-fns'


const useLogin = () => {
  const { setToken } = useToken()
  const [isLoading, setIsLoading] = useState(false)

  const login = async ({ email, password }: { email: string, password: string }) => {
    setIsLoading(true)
    try {
      const { data: response } = await axios.post<{ accessToken: string }>(`${apiUrl}/login`, {
        email,
        password
      })

      if (response.accessToken) {
        setToken(response.accessToken)
      }

      return response
    } catch (error) {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      setToken(null)
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Email or password invalid') {
          toast({
            variant: 'destructive',
            title: 'Email ou senha inválidos!',
          })
        } else if (error.message === 'Network Error') {
          toast({
            variant: 'destructive',
            title: 'Erro ao conectar no servidor!',
          })
        } else if (error.response?.status === 500) {
          toast({
            variant: 'destructive',
            title: 'Erro interno no servidor!',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro ao realizar login!',
          })
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao realizar login!',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setToken(null)
  }

  return { login, logout, isLoading }
}

export default useLogin