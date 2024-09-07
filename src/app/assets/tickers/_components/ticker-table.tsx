import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ITickerSection from './ticker-section-interface'
import Currency from '@/components/ui/currency'

export default function TickerTable({ stocks, handleItemClick }: ITickerSection) {

  return (
    <section className='hidden md:block w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map(stock => (
            <TableRow
              key={stock.ticker}
              onClick={() => handleItemClick(stock)}
              className='cursor-pointer'
            >
              <TableCell>{stock.ticker}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.stockType}</TableCell>
              <TableCell><Currency value={stock.price} className='justify-center' /></TableCell>
              <TableCell>{new Date(stock.updatedAt).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
