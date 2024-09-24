import { Button } from '@/components/ui/button'
import Image, { StaticImageData } from 'next/image'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface SocialButtonProps {
  providerName: string
  providerLogo?: StaticImageData
  onClick?: () => void
  className?: ClassNameValue
}

export default function SocialButton({ providerName, providerLogo, onClick, className }: SocialButtonProps) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={cn('w-full space-x-4', className)}
    >
      {providerLogo && <Image src={providerLogo} alt={providerName} width={24} height={24} />}
      <p>Entrar com {providerName}</p>
    </Button>
  )
}
