import type { Product } from '@commerce/types/product'
export type SelectedOptions = Record<string, string | null>
import { Dispatch, SetStateAction } from 'react'
//lägga till data: any här?
export function getProductVariant(product: Product, opts: SelectedOptions) {
  const variant = product.filter1Items.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.value.find((option) => {
        if (
          option.__typename === 'ProductWithVariantsContentType' &&
          option.value.toLowerCase() === key.toLowerCase()
        ) {
          return option.value
        }
      })
    )
  })
  return variant
}

export function selectDefaultOptionFromProduct(
  product: Product,
  data: any,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  //har ändrat denna 
  // Selects the default option
  product.filter1Items.forEach((v) => {
    updater((choices) => ({
      ...choices,
      [v.name.toLowerCase()]: v.value[0].value.toLowerCase(),
    }))
  })}



  /**
   * OG
   * export function getProductVariant(product: Product, opts: SelectedOptions) {
  // const variant = product.variants.find((variant) => {
  //   return Object.entries(opts).every(([key, value]) =>
  //     variant.options.find((option) => {
  //       if (
  //         option.__typename === 'MultipleChoiceOption' &&
  //         option.displayName.toLowerCase() === key.toLowerCase()
  //       ) {
  //         return option.values.find((v) => v.label.toLowerCase() === value)
  //       }
  //     })
  //   )
  // })
  // return variant
}

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product.variants[0]?.options?.forEach((v) => {
    updater((choices) => ({
      ...choices,
      [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
    }))
  })}
   * 
   * 
   */