import StockGroupCard from '../stock-group-card'

const StockGroupsSection = () => {
  return (
    <section className='flex flex-row justify-start items-start flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden px-4'>
      <StockGroupCard />
      <StockGroupCard />
      <StockGroupCard />
      <StockGroupCard />
    </section>
  )
}

export default StockGroupsSection