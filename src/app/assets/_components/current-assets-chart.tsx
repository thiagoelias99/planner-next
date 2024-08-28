import { Label, Pie, PieChart } from 'recharts'
import React from 'react'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface Props {
  chartData: any[]
  chartConfig: ChartConfig
}

export default function CurrentAssetsChart({ chartData, chartConfig }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full aspect-square"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend
          className='w-full flex flex-row flex-wrap justify-center items-center xl:text-base'

          content={<ChartLegendContent />} />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          innerRadius={40}
          strokeWidth={0}
        >
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
