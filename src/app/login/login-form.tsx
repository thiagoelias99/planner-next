'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from '@/lib/pt-zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Loader2Icon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import useToken from '@/hooks/use-token'
import useLogin from '@/hooks/use-login'

export default function LoginForm() {
  const formSchema = z.object({
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, 'A senha deve conter no mínimo 6 dígitos sendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
    email: z.string().email(),
  })

  const [keepConnected, setKeepConnected] = useState(false)

  const navigate = useRouter()
  const { login, isLoading } = useLogin()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await login(values)

    if (result) {
      if (keepConnected) {
        localStorage.setItem('token', result.accessToken)
        sessionStorage.removeItem('token')
      } else {
        sessionStorage.setItem('token', result.accessToken)
        localStorage.removeItem('token')
      }
      navigate.push('/')
    }
  }

  return (
    <Card className='mt-8 w-[80%]'>
      <CardContent>
        <CardHeader className='px-0'>
          <CardTitle className='text-left text-xl w-full'>Entre para utilizar</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Digite sua senha..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2">
              <Checkbox id="terms" checked={keepConnected} onCheckedChange={(() => setKeepConnected(!keepConnected))} />
              <label
                htmlFor="terms"
                className="text-xs font-medium cursor-pointer text-gray-500 hover:text-gray-700"
              >
                Permanecer conectado?
              </label>
            </div>
            <div className="pt-4"></div>
            <Button
              type="submit"
              variant='default'
              className='w-full mt-6 flex justify-center items-center gap-4'
              disabled={isLoading}
            >
              <Loader2Icon className={`w-6 h-6 animate-spin ${isLoading ? 'block' : 'hidden'}`} />
              Entrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
