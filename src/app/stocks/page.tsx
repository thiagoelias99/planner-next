import { Stock, StockType, UserStock } from '@/models/user-stock'
import { GraphSection } from './components/graph-section'
import StockGroupsSection from './components/stock-groups-section'
import StocksSection from './components/stocks-section'


export default function Stocks() {

  const sampleData: UserStock = {
    'count': 23,
    'totalAmount': 169537.76999999996,
    'stocks': {
      'data': [
        {
          'id': '2f43b814-20ff-4aa4-b699-580d7f6d1d84',
          'ticker': 'ABEV3',
          'name': 'AMBEV S.A.',
          'type': 'Ação' as StockType,
          'price': 12.27,
          'latestTradingDay': new Date('2024-04-03T12:51:19.119Z'),
          'stockQuantity': 85,
          'totalDepositValue': 1256.9999999999998,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 14.788235294117644,
          'profitability': -17.028639618138406,
          'profit': 100
        },
        {
          'id': '1a0a54e9-4a8e-4731-a87d-126973684084',
          'ticker': 'B3SA3',
          'name': 'B3 S.A. – BRASIL, BOLSA, BALCÃO',
          'type': 'Ação' as StockType,
          'price': 11.73,
          'latestTradingDay': new Date('2024-04-03T12:51:19.088Z'),
          'stockQuantity': 190,
          'totalDepositValue': 7065.490000000001,
          'totalWithdrawValue': 3972.9500000000007,
          'averageStockBuyPrice': 12.914551578947366,
          'profitability': -9.172223841502635,
          'profit': 100
        },
        {
          'id': 'ceb9fee5-9991-477a-afcc-5ac5d166f1f0',
          'ticker': 'BBAS3',
          'name': 'BANCO DO BRASIL S/A',
          'type': 'Ação' as StockType,
          'price': 56.17,
          'latestTradingDay': new Date('2024-04-03T12:51:19.123Z'),
          'stockQuantity': 20,
          'totalDepositValue': 2178.8200000000006,
          'totalWithdrawValue': 1552.42,
          'averageStockBuyPrice': 34.16,
          'profitability': 64.43208430913351,
          'profit': 100
        },
        {
          'id': 'd328124b-aaba-40d0-ab9f-d7e72e7caa83',
          'ticker': 'CASH3',
          'name': 'MELIUZ S.A.',
          'type': 'Ação' as StockType,
          'price': 5.24,
          'latestTradingDay': new Date('2024-04-03T12:51:19.062Z'),
          'stockQuantity': 65,
          'totalDepositValue': 7198.029999999999,
          'totalWithdrawValue': 6733.349999999999,
          'averageStockBuyPrice': 9.528703296703299,
          'profitability': -45.008257295482025,
          'profit': 100
        },
        {
          'id': '968ed27d-2017-4435-b1ff-f12d13b041f0',
          'ticker': 'EQTL3',
          'name': 'EQUATORIAL ENERGIA S.A.',
          'type': 'Ação' as StockType,
          'price': 32.25,
          'latestTradingDay': new Date('2024-04-03T12:51:19.117Z'),
          'stockQuantity': 80,
          'totalDepositValue': 7429.929999999999,
          'totalWithdrawValue': 5980.72,
          'averageStockBuyPrice': 23.522726563669448,
          'profitability': 37.10145340808286,
          'profit': 100
        },
        {
          'id': '614a4f26-51a5-4664-8799-29000fc6e543',
          'ticker': 'ITSA4',
          'name': 'ITAUSA S/A',
          'type': 'Ação' as StockType,
          'price': 10.18,
          'latestTradingDay': new Date('2024-04-03T12:51:19.092Z'),
          'stockQuantity': 288,
          'totalDepositValue': 6788.959999999999,
          'totalWithdrawValue': 3638.08,
          'averageStockBuyPrice': 10.772451936030812,
          'profitability': -5.499694401506005,
          'profit': 100
        },
        {
          'id': '6a9f0d67-cce7-49ca-a3e8-2cb56a77fe9d',
          'ticker': 'MGLU3',
          'name': 'MAGAZINE LUIZA S/A',
          'type': 'Ação' as StockType,
          'price': 1.74,
          'latestTradingDay': new Date('2024-04-03T12:51:19.107Z'),
          'stockQuantity': 660,
          'totalDepositValue': 12369.329999999998,
          'totalWithdrawValue': 8604.339999999998,
          'averageStockBuyPrice': 3.7403527157011647,
          'profitability': -53.48032305360218,
          'profit': 100
        },
        {
          'id': '4b411035-908c-48b4-be50-71823ceea2b4',
          'ticker': 'MOVI3',
          'name': 'MOVIDA      ',
          'type': 'Ação' as StockType,
          'price': 8.2,
          'latestTradingDay': new Date('2024-04-03T12:51:19.113Z'),
          'stockQuantity': 40,
          'totalDepositValue': 516.2,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 12.91,
          'profitability': -36.483346243222314,
          'profit': 100
        },
        {
          'id': 'c66d7099-cc9f-414a-ac6e-4fd82e408afb',
          'ticker': 'NTCO3',
          'name': 'NATURA &CO HOLDING S.A.',
          'type': 'Ação' as StockType,
          'price': 17.24,
          'latestTradingDay': new Date('2024-04-03T12:51:19.105Z'),
          'stockQuantity': 80,
          'totalDepositValue': 8280.249999999998,
          'totalWithdrawValue': 5405.620000000001,
          'averageStockBuyPrice': 21.714047422366505,
          'profitability': -20.604391872875915,
          'profit': 100
        },
        {
          'id': '468e7a23-d285-4ac1-9e7c-7fb70bd85d5b',
          'ticker': 'PETR4',
          'name': 'PETROLEO BRASILEIRO S/A PETROBRAS',
          'type': 'Ação' as StockType,
          'price': 38.62,
          'latestTradingDay': new Date('2024-04-03T12:51:19.156Z'),
          'stockQuantity': 147,
          'totalDepositValue': 8433.270000000002,
          'totalWithdrawValue': 5002.25,
          'averageStockBuyPrice': 27.349125272457385,
          'profitability': 41.211097668608886,
          'profit': 100
        },
        {
          'id': 'c0fa3fb7-bc09-4caa-869f-f1be936b7794',
          'ticker': 'POSI3',
          'name': 'POSITIVO TECNOLOGIA S.A',
          'type': 'Ação' as StockType,
          'price': 10.94,
          'latestTradingDay': new Date('2024-04-03T12:51:19.143Z'),
          'stockQuantity': 200,
          'totalDepositValue': 4187.42,
          'totalWithdrawValue': 3001.7999999999997,
          'averageStockBuyPrice': 8.162749999999999,
          'profitability': 34.023460230927085,
          'profit': 100
        },
        {
          'id': '60ec55d0-1ad5-425e-b815-afdb6b765dec',
          'ticker': 'RENT3',
          'name': 'LOCALIZA RENT A CAR S/A',
          'type': 'Ação' as StockType,
          'price': 51.85,
          'latestTradingDay': new Date('2024-04-04T16:31:07.969Z'),
          'stockQuantity': 23,
          'totalDepositValue': 6789.820000000001,
          'totalWithdrawValue': 6081.640000000001,
          'averageStockBuyPrice': 55.35341912799763,
          'profitability': -6.329182881903694,
          'profit': 100
        },
        {
          'id': '4587e8b4-6dcd-4e1f-98ee-caa476781e9e',
          'ticker': 'TASA4',
          'name': 'TAURUS ARMAS S/A',
          'type': 'Ação' as StockType,
          'price': 12.96,
          'latestTradingDay': new Date('2024-04-03T12:51:19.145Z'),
          'stockQuantity': 50,
          'totalDepositValue': 770.3,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 15.408,
          'profitability': -15.88785046728971,
          'profit': 100
        },
        {
          'id': '61cd55d9-16dc-436e-bb22-61e6a2174338',
          'ticker': 'VALE3',
          'name': 'VALE S.A.',
          'type': 'Ação' as StockType,
          'price': 61.94,
          'latestTradingDay': new Date('2024-04-03T12:51:19.166Z'),
          'stockQuantity': 69,
          'totalDepositValue': 11255.699999999999,
          'totalWithdrawValue': 6673.23,
          'averageStockBuyPrice': 77.64302950990268,
          'profitability': -20.224648122340326,
          'profit': 100
        }
      ],
      'totalAmount': 27082.64,
      'percentage': 15.974399097027172,
      'count': 14
    },
    'reits': {
      'data': [
        {
          'id': 'ee6e30e6-6a17-4189-b289-a8f3374c9f0a',
          'ticker': 'BCFF11',
          'name': 'FDO INV IMOB',
          'type': 'FII' as StockType,
          'price': 9.17,
          'latestTradingDay': new Date('2024-04-03T12:51:19.138Z'),
          'stockQuantity': 1721,
          'totalDepositValue': 16260.59,
          'totalWithdrawValue': 2605.4700000000003,
          'averageStockBuyPrice': 8.175276002324228,
          'profitability': 12.16746685240928,
          'profit': 100
        },
        {
          'id': '44db9cad-5cec-402a-a867-7c59afdfa4fe',
          'ticker': 'CPTS11',
          'name': 'CAPITANIA SECURITIES II FDO INV IMOB',
          'type': 'FII' as StockType,
          'price': 8.55,
          'latestTradingDay': new Date('2024-04-03T12:51:19.097Z'),
          'stockQuantity': 1770,
          'totalDepositValue': 14323.3,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 8.09225988700565,
          'profitability': 5.656517701926234,
          'profit': 100
        },
        {
          'id': '4f3e6e41-d525-42f3-882a-2b94be8bb356',
          'ticker': 'HGLG11',
          'name': 'CSHG LOGISTICA FUNDO DE INVESTIMENTO IMOBILIARIO',
          'type': 'FII' as StockType,
          'price': 168.25,
          'latestTradingDay': new Date('2024-04-03T12:51:19.079Z'),
          'stockQuantity': 93,
          'totalDepositValue': 19357.909999999996,
          'totalWithdrawValue': 3995.94,
          'averageStockBuyPrice': 162.95101411290324,
          'profitability': 3.251888867304187,
          'profit': 100
        },
        {
          'id': '207e6a7b-aa94-4a4a-b0af-362cce99f041',
          'ticker': 'MXRF11',
          'name': 'MAXI RENDA FUNDO DE INVESTIMENTO IMOBILIARIO',
          'type': 'FII' as StockType,
          'price': 10.35,
          'latestTradingDay': new Date('2024-04-03T12:51:19.115Z'),
          'stockQuantity': 1205,
          'totalDepositValue': 11774.449999999999,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 9.771327800829877,
          'profitability': 5.922144983417477,
          'profit': 100
        },
        {
          'id': 'e3017b1f-5aaf-414d-8370-c4fc6ab9efa3',
          'ticker': 'XPIN11',
          'name': 'FII XP INDL ',
          'type': 'FII' as StockType,
          'price': 80.4,
          'latestTradingDay': new Date('2024-04-03T12:51:18.886Z'),
          'stockQuantity': 145,
          'totalDepositValue': 15175.380000000001,
          'totalWithdrawValue': 1002,
          'averageStockBuyPrice': 95.61824564122433,
          'profitability': -15.915629427385369,
          'profit': 100
        },
        {
          'id': '602a02c8-2056-4142-8e29-2fdeb0122f51',
          'ticker': 'XPML11',
          'name': 'XP MALLS FDO INV IMOB FII',
          'type': 'FII' as StockType,
          'price': 116.88,
          'latestTradingDay': new Date('2024-04-03T12:51:19.185Z'),
          'stockQuantity': 128,
          'totalDepositValue': 13459.300000000001,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 105.15078124999998,
          'profitability': 11.154666290223126,
          'profit': 100
        }
      ],
      'totalAmount': 85652.71,
      'percentage': 50.52131451298435,
      'count': 6
    },
    'internationals': {
      'data': [
        {
          'id': 'ca5d64fd-cd43-4ce0-ae48-cee50e3bb642',
          'ticker': 'IVVB11',
          'name': 'ISHARE S&P 500 FIC EM FUNDO DE INDICE IE',
          'type': 'ETF' as StockType,
          'price': 292.7,
          'latestTradingDay': new Date('2024-04-03T12:51:19.086Z'),
          'stockQuantity': 115,
          'totalDepositValue': 29052.370000000003,
          'totalWithdrawValue': 3695.2299999999996,
          'averageStockBuyPrice': 220.87903105590058,
          'profitability': 32.515974287266225,
          'profit': 100
        }
      ],
      'totalAmount': 33660.5,
      'percentage': 19.854277899255138,
      'count': 1
    },
    'cryptos': {
      'data': [
        {
          'id': '7b672f29-dbe3-497d-ba15-6704d6b85a5a',
          'ticker': 'QBTC11',
          'name': 'QR BITCOIN  ',
          'type': 'ETF' as StockType,
          'price': 21.1,
          'latestTradingDay': new Date('2024-04-03T12:51:19.148Z'),
          'stockQuantity': 816,
          'totalDepositValue': 8526.08,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 10.448627450980393,
          'profitability': 101.94039933943854,
          'profit': 100
        }
      ],
      'totalAmount': 17217.600000000002,
      'percentage': 10.155613112051672,
      'count': 1
    },
    'gold': {
      'data': [
        {
          'id': '5d08b5b5-aaa5-413d-a112-67c441a73387',
          'ticker': 'GOLD11',
          'name': 'TREND ETF LBMA OURO',
          'type': 'ETF' as StockType,
          'price': 12.14,
          'latestTradingDay': new Date('2024-04-03T12:51:19.064Z'),
          'stockQuantity': 488,
          'totalDepositValue': 5007.379999999999,
          'totalWithdrawValue': 0,
          'averageStockBuyPrice': 10.261024590163933,
          'profitability': 18.31177182478665,
          'profit': 100
        }
      ],
      'totalAmount': 5924.320000000001,
      'percentage': 3.4943953786816957,
      'count': 1
    }
  }

  return (
    <main className='flex flex-col gap-4'>
      <GraphSection userStockData={sampleData} />
      <StockGroupsSection userStockData={sampleData} />
      <StocksSection userStockData={sampleData} />
    </main>
  )
} 