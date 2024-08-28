'use client'

import ModuleBar from '@/components/module-bar'
import useAssets from '@/hooks/assets/use-assets'
import { formatCurrency } from '@/lib/format-currency'
import { formatPercentage } from '@/lib/format-percentage'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, ArrowUpIcon, Loader2Icon } from 'lucide-react'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import EditCashBoxDialog from './my_stocks/_components/edit-cash-box-dialog'
import { CashBoxPension } from '@/models/assets/fixed-income'
import { Card, Card2, CardHeader, CardTitle } from '@/components/ui/card'
import AssetCard from './_components_old/asset-card'
import AssetGrowCard from './_components_old/asset-grow-card'
import AssetAdjustCard from './_components_old/asset-adjust-card'

export default function Assets() {
  const { getSummary } = useAssets()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CashBoxPension | undefined>(undefined)

  return (
    <div className='py-4'>
      <ModuleBar title='Assets' className='px-4' />
      <section className='w-full p-4 flex flex-col gap-4 max-w-[560px] mx-auto'>

        <AssetCard
          isLoading={getSummary.isFetching}
          title='Current Total'
          value={getSummary.data?.currentTotalValue || 0}
        >
          <div className='w-full flex justify-center items-start gap-4'>
            <AssetGrowCard
              isLoading={getSummary.isFetching}
              title='Passive Grow'
              value={getSummary.data?.lastMonthHistoric.passiveGainLosses}
              percentage={getSummary.data?.lastMonthHistoric.passiveGainLossesPercentage}
            />
            <AssetGrowCard
              isLoading={getSummary.isFetching}
              title='Total Grow'
              value={getSummary.data?.lastMonthHistoric.generalGainLosses}
              percentage={getSummary.data?.lastMonthHistoric.generalPercentage}
            />
          </div>
        </AssetCard>

        <div
          role='button'
          onClick={() => {
            setSelectedItem(getSummary.data?.fixedIncomes.financialInjections[0])
            setOpenDialog(true)
          }}
        >
          <AssetCard
            isLoading={getSummary.isFetching}
            title='Financial Injection'
            value={getSummary.data?.fixedIncomes.financialInjections[0].value}
          />
        </div>

        <div
          role='button'
          onClick={() => {
            setSelectedItem(getSummary.data?.fixedIncomes.share[0])
            setOpenDialog(true)
          }}
        >
          <AssetCard
            isLoading={getSummary.isFetching}
            title='To Share'
            value={getSummary.data?.sharesTotalValue}
            percentage={(getSummary.data?.sharesPercentage || 0) / 100}
          />
        </div>

        <ul className='contents'>
          <NextLink href='assets/my_stocks?init=cashbox' >
            <AssetCard
              title='Cash Boxes'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.cashBoxesTotalValue}
              percentage={getSummary.data && getSummary.data?.cashBoxesPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.cashBoxesAdjust}
                  percentage={getSummary.data && getSummary.data?.cashBoxesPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.cashBoxesGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.cashBoxesPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=fixed' >
            <AssetCard
              title='Fixed Incomes'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.fixedIncomesTotalValue}
              percentage={getSummary.data && getSummary.data?.fixedIncomesPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.fixedIncomesAdjust}
                  percentage={getSummary.data && getSummary.data?.fixedIncomesPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.fixedIncomesGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.fixedIncomesPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=stocks' >
            <AssetCard
              title='Stock'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.stocksTotalValue}
              percentage={getSummary.data && getSummary.data?.stocksPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.stocksAdjust}
                  percentage={getSummary.data && getSummary.data?.stocksPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.stocksGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.stocksPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=reits' >
            <AssetCard
              title='REITs'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.reitsTotalValue}
              percentage={getSummary.data && getSummary.data?.reitsPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.reitsAdjust}
                  percentage={getSummary.data && getSummary.data?.reitsPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.reitsGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.reitsPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=internationals' >
            <AssetCard
              title='Internationals'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.internationalsTotalValue}
              percentage={getSummary.data && getSummary.data?.internationalsPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.internationalsAdjust}
                  percentage={getSummary.data && getSummary.data?.internationalsPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.internationalsGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.internationalsPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=golds' >
            <AssetCard
              title='Golds'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.goldsTotalValue}
              percentage={getSummary.data && getSummary.data?.goldsPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.goldsAdjust}
                  percentage={getSummary.data && getSummary.data?.goldsPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.goldsGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.goldsPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=cryptos' >
            <AssetCard
              title='Cryptos'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.cryptosTotalValue}
              percentage={getSummary.data && getSummary.data?.cryptosPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.cryptosAdjust}
                  percentage={getSummary.data && getSummary.data?.cryptosPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.cryptosGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.cryptosPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=pension' >
            <AssetCard
              title='Pensions'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.pensionsTotalValue}
              percentage={getSummary.data && getSummary.data?.pensionsPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.pensionsAdjust}
                  percentage={getSummary.data && getSummary.data?.pensionsPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.pensionsGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.pensionsPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>

          <NextLink href='assets/my_stocks?init=properties' >
            <AssetCard
              title='Properties'
              isLoading={getSummary.isFetching}
              value={getSummary.data?.propertiesTotalValue}
              percentage={getSummary.data && getSummary.data?.propertiesPercentage / 100}
            >
              <div className='w-full flex justify-center items-start gap-4'>
                <AssetAdjustCard
                  isLoading={getSummary.isFetching}
                  value={getSummary.data?.propertiesAdjust}
                  percentage={getSummary.data && getSummary.data?.propertiesPercentagePlanned / 100}
                />
                <AssetGrowCard
                  isLoading={getSummary.isFetching}
                  title='Total Grow'
                  value={getSummary.data?.lastMonthHistoric.propertiesGainLosses}
                  percentage={getSummary.data?.lastMonthHistoric.propertiesPercentage}
                />
              </div>
            </AssetCard>
          </NextLink>
        </ul>

      </section>
      <EditCashBoxDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        hiddenTrigger
      />
    </div>
  )
}