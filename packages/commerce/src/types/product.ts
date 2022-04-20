import exp from "constants"

export type ProductImage = {
  url: string
  alt?: string
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
  //lagt till->
  formattedPrice : string
  currency: string
}

export type ProductOption = {
  __typename?: 'MultipleChoiceOption'
  id: string
  displayName: string
  values: ProductOptionValues[]
}

export type ProductOptionValues = {
  label: string
  hexColors?: string[]
}

export type ProductVariant = {
  id: string | number
  options: ProductOption[]
  availableForSale?: boolean
}

//egen
export type LitiumOptionValues= {
  value: string
  __typename:string
}
//egen
export type LitiumOption = {
  filter1Text: string
  filter2Text : string
  isActive: boolean,
  enabled: boolean,
  name: string,
  url: string
  value: LitiumOptionValues[]
}
//egen
// export type filter1Items = {
//   filter1Text: string
//   isActive: boolean,
//   value: string,
//   enabled: boolean,
//   name: string,
//   url: string
// }
// //egen
// export type filter2Items = {
//   filter2Text : string
//   isActive: boolean,
//   value: string,
//   enabled: boolean,
//   name: string,
//   url: string
// }

//egen
export type filter1Text = {
  filter1Text: string
}
//egen
export type filter2Text = {
  filter2Text: string
}
//byggt på denna
export type Product = {
  id: string
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
  vendor?: string
  //lagt till ->
  url? : string
  filter1Items: LitiumOption[]
  filter1Text: LitiumOption[]
  filter2Items: LitiumOption[]
  filter2Text: LitiumOption[]
  brand?: string
  color?: string
  isInStock?: boolean
  stockStatusDescription?: string
  showBuyButton? : boolean
  showQuantityField?: boolean
}

export type SearchProductsBody = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
  locale?: string
}

export type ProductTypes = {
  product: Product
  searchBody: SearchProductsBody
}

export type SearchProductsHook<T extends ProductTypes = ProductTypes> = {
  data: {
    products: T['product'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook<T>
    }
  }
}

export type GetAllProductPathsOperation<T extends ProductTypes = ProductTypes> =
  {
    data: { products: Pick<T['product'], 'path'>[] }
    variables: { first?: number }
  }

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] }
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
