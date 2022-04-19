import data from '../../data.json'
import GetWoman from '../endpoints/fetchWoman'



export type GetAllProductPathsResult = {
  products: Array<{ url: string }>
}

export default function getAllProductPathsOperation() {
  async function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    let womanProducts = await GetWoman();
    return Promise.resolve({
      //bytt till Litium-produkter
      products: womanProducts.map(({ url }) => ({ url })),
      // products: data.products.map(({ path }) => ({ path })),
    })
  }

  return getAllProductPaths
}
