import NextLink from 'next/link'

interface Props {
  href: string
  label: string
}

const LinkItem = ({ href, label }: Props) => {
  return (
    <li>
      <NextLink href={href}>
        <p className='text-lg'>{label}</p>
      </NextLink>
    </li>
  )
}

export default LinkItem