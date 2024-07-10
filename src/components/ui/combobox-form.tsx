'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ClassNameValue } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { ScrollArea } from './scroll-area'

interface ComboboxFormProps {
  fieldName: string,
  inputTextAlight?: 'left' | 'center' | 'right'
  label?: string
  placeholder?: string
  className?: ClassNameValue
  form: UseFormReturn<any>
  options: { label: string, value: string }[]
  disabled?: boolean
  defaultValue?: string
}

export function ComboboxForm({ label, fieldName, className, form, options, disabled, defaultValue, inputTextAlight = 'left' }: ComboboxFormProps) {
  'use client'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setValue(fieldName, '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  function handleSelect(value: string) {
    form.setValue(fieldName, value)
    setOpen(false)
  }

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full flex flex-col gap-2 ${className}`}>
          <FormLabel className={`${label ? '' : 'hidden'}`}>{label}</FormLabel>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className=''>
              <FormControl className='bg-transparent'>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  className={cn(
                    'w-full flex flex-row items-center justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <p className={`flex-1 overflow-hidden text-ellipsis text-${inputTextAlight}`}>
                    {field.value
                      ? options.find(
                        (option) => option.value === field.value
                      )?.label
                      : 'Select an option'}
                  </p>
                  <ChevronsUpDown className="ml-0.5 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </DrawerTrigger>
            <DrawerContent className='h-[560px]'>
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandEmpty>Not found</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[560px] w-full pb-4">
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          handleSelect(option.value)
                        }}
                        className='cursor-pointer'
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            option.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </DrawerContent>
          </Drawer>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}