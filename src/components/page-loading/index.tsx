import { Loader2Icon } from 'lucide-react'

export default function PageLoading() {
  return (
    <div className='w-full h-full flex flex-row items-center justify-center gap-4 pt-28'>
      <Loader2Icon size={50} className='animate-spin text-foreground' />
      <p className='text-3xl text-foreground italic'>Carregando...</p>
    </div>
  )
}