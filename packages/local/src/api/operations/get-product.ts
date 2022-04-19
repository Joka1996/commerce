import type { LocalConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import data from '../../data.json'
import type { OperationContext } from '@vercel/commerce/api/operations'
import GetSingleProduct from '../endpoints/fetchSingleProduct'


export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any > {
    //Hämta all data från enkel produkt
    let singleProduct = await GetSingleProduct();
    return {
      product: singleProduct,
    }
  }

  return getProduct
}
//og
//data.products.find(({ slug }) => slug === variables!.slug)