import { IS_MAINNET } from '@tape.xyz/constants'
import type { SupportedOpenActionModuleType } from '@tape.xyz/lens/custom-types'
import { Callout, WarningOutline } from '@tape.xyz/ui'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'

const getUniswapURL = (amount: number, outputCurrency: string): string => {
  return `https://app.uniswap.org/#/swap?exactField=output&exactAmount=${amount}&outputCurrency=${outputCurrency}&chain=${
    IS_MAINNET ? 'polygon' : 'polygon_mumbai'
  }`
}

type Props = {
  action: SupportedOpenActionModuleType
}

const BalanceAlert: FC<Props> = ({ action }) => {
  return (
    <div className="flex-1">
      <Callout variant="danger" icon={<WarningOutline className="size-4" />}>
        <div className="flex w-full flex-1 items-center justify-between space-x-2 text-sm">
          <span>Not enough {action?.amount?.asset?.symbol} token balance</span>
          <Link
            href={getUniswapURL(
              parseFloat(action?.amount?.value),
              action?.amount?.asset?.contract.address
            )}
            rel="noreferer noreferrer"
            target="_blank"
            className="text-brand-500"
          >
            Swap
          </Link>
        </div>
      </Callout>
    </div>
  )
}

export default BalanceAlert
