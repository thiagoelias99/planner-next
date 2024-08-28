import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, XAxis, YAxis } from 'recharts'

interface Props {
  chartData: any[]
  chartConfig: ChartConfig
}

export default function BalanceChart({ chartData, chartConfig }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[120px] max-h-[260px]'
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          type='number'
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          tickFormatter={(value) => Number(value) / 1000 + 'k'}
          domain={[682000, 'auto']}
          allowDataOverflow={true}
          hide
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-balance)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-balance)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="balance"
          type="natural"
          fill="url(#fillBalance)"
          fillOpacity={0.4}
          stroke="var(--color-balance)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
