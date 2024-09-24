import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Header1 } from '@/components/ui/typography'
import { SettingsIcon } from 'lucide-react'

interface SettingPopoverProps{
  showDeleted: boolean
  setShowDeleted: (value: boolean) => void
}

export function SettingPopover({showDeleted, setShowDeleted} : SettingPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size='icon'><SettingsIcon /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side='bottom'>
        <Header1>Configurações</Header1>
        <div className='w-full mt-4 h-8 flex flex-row justify-start items-start gap-4'>
          <Checkbox className='w-7 h-7' checked={showDeleted} onCheckedChange={(state) => {setShowDeleted(state as boolean)}} />
          <p className='text-base'>Mostrar deletados?</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}