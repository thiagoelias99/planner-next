import NextLink from 'next/link'

export default function Home() {

  return (
    <main>
      <NextLink href="/stocks" passHref>
        <p>Stocks</p>
      </NextLink >
    </main>
  )
}
