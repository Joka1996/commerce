import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LocalConfig, Provider } from '../index'
import data from '../../data.json'
import GetWoman from '../endpoints/fetchWoman'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products:  Product[] | any[] }> {
    //Hämta datan  från fetchWomanTops
    let womanProducts = await GetWoman();
    return {
      //den här med komponent som gör fetch anrop till Litium data.products byts ut 
      //OG data.products
      products: womanProducts,
    }
  }
  return getAllProducts
}


