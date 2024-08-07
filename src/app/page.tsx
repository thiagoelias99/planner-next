import AssetsSection from './_components/assets-section'
import BudgetsSection from './_components/budgets-section'
import ToDosSection from './_components/todos-section'

export default function Home() {

  return (
    <main className='py-4 space-y-4'>
      <AssetsSection className='px-4' />
      <BudgetsSection className='px-4' />
      <ToDosSection className='px-4' />
    </main>
  )
}
