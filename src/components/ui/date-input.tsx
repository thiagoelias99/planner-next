import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <Label className="mb-1">{label}</Label>
        <input
          type={'date'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
DateInput.displayName = 'DateInput'

export { DateInput }