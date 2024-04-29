'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
// import { useMediaQuery } from '@uidotdev/usehooks'

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
  label: string
  placeholder?: string
  className?: ClassNameValue
  form: UseFormReturn<any>
  options: { label: string, value: string }[]
  disabled?: boolean
  defaultValue?: string
}

export function ComboboxForm({ label, fieldName, className, form, options, disabled, defaultValue }: ComboboxFormProps) {
  'use client'
  const [open, setOpen] = useState(false)
  // const isDesktop = useMediaQuery('(min-width: 768px)')
  const isDesktop = false

  useEffect(() => {
    console.log(defaultValue)
    if (defaultValue !== undefined) {
      console.log('aqui')
      form.setValue(fieldName, '')
    }
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
        <FormItem className={`w-full flex flex-col mt-2 ${className}`}>
          <FormLabel className='mb-0.5'>{label}</FormLabel>
          {isDesktop && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-between text-foreground',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? options.find(
                        (option) => option.value === field.value
                      )?.label
                      : 'Selecione'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar..." />
                  <CommandEmpty>Não encontrado</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="max-h-[160px] w-full pb-4">
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            handleSelect(option.value)
                          }}
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
              </PopoverContent>
            </Popover>
          )}
          {!isDesktop && (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      'w-full px-1.5 flex flex-row items-center justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <p className='flex-1 overflow-hidden text-left text-ellipsis'>
                      {field.value
                        ? options.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Selecione'}
                    </p>
                    <ChevronsUpDown className="ml-0.5 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </DrawerTrigger>
              <DrawerContent className='h-[560px]'>
                <Command>
                  <CommandInput placeholder="Buscar..." />
                  <CommandEmpty>Não encontrado</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[560px] w-full pb-4">
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            handleSelect(option.value)
                          }}
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
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}