import NextLink from 'next/link'

interface Props {
  href: string
  label: string
}

const LinkItem = ({ href, label }: Props) => {
  return (
    <li>
      <NextLink href={href}>
        <p className='text-lg hover:bg-primary px-2 py-2 rounded hover:text-primary-foreground'>{label}</p>
      </NextLink>
    </li>
  )
}

export default LinkItem