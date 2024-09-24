'use client'

import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/services/webclient/queryClient'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {children}
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}
