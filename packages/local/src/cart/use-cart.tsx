import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import GetCart from 'api/endpoints/GetCart'


export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
 
  fetchOptions: {
    query: '',
    url: "",
  },
  async fetcher() {
    return {
      id: '',
      createdAt: '',
      currency: { code: '' },
      taxesIncluded: '',
      lineItems: [],
      lineItemsSubtotalPrice: '',
      subtotalPrice: 0,
      totalPrice: 0,
      //lagt till
      items: [],
      formattedTotalPrice: "",
      vatAmount: 0,
      vatRate:0,
    }
  },
  
  useHook:
    ({ useData }) =>
    (input) => {
      return useMemo(
        () =>
          Object.create(
            {},
            {
              isEmpty: {
                get() {
                  return true
                },
                enumerable: true,
              },
            }
          ),
        []
      )
    },
}
