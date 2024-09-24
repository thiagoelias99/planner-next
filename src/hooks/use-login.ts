import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import useToken from './use-token'
import { toast } from './use-toast'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const callbackUrl = `${serverUrl}/auth_callback`

const useLogin = () => {
  const { setToken } = useToken()
  const [isLoading, setIsLoading] = useState(false)

  const login = async ({ email, storage }: { email: string, storage: 'local' | 'session'  }) => {
    console.log(callbackUrl)

    setIsLoading(true)
    try {
      const response = await axios.get<{ url: string }>(`${apiUrl}/kinde_login?provider=email&email=${email}&callbackUrl=${callbackUrl}?storage=${storage}`)

      if (response.status === 200) {
        return response.data.url
      } else {
        throw new Error('Erro ao realizar login!')
      }    
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