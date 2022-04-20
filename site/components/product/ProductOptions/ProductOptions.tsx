import { memo } from 'react'
import { Swatch } from '@components/product'
//lägg till de tre första som import
import type {LitiumOption, filter1Items, filter2Items, filter1Text, filter2Text ,ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import React, { ChangeEvent, useState } from "react";
import { Change } from '@react-spring/web';
import Link from 'next/link'


interface ProductOptionsProps {
  // options: ProductOption[]
  filter1Items: filter1Items[]
  filter1Text: filter1Text[]
  filter2Items:filter2Items[]
  filter2Text:filter2Text[]
  //nytt test
  options: LitiumOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}
const ProductOptions: React.FC<ProductOptionsProps> = ({
  // options,
  //ersätt options med min egna options
  filter1Items, //färg
  filter1Text, //färg
  filter2Items, //storlek
  filter2Text, //storlek
  selectedOptions,
  options,
  setSelectedOptions,
}) => {
  
  return (
    <div>
      {/* FÄRG */}
        <h2 className="uppercase font-medium text-sm tracking-wide">
          {filter1Text}
        </h2>
        <div role="listbox" className="flex flex-row py-4">
      {filter1Items.map((opt) => {
        return (
          <div className="pb-4" key={opt.url}>
          <Link href={`${opt.url}`}>
          <a>
         <Swatch
          key="Color"
          color={opt.value}
          active={opt.isActive}
          label={opt.name}
          variant={opt.value}
        />
        </a>
           </Link>
        </div>
        )
      })}
      </div>

     {/* SIZE */}
     <h2 className="uppercase font-medium text-sm tracking-wide">
     {filter2Text}
        </h2>
        <div role="listbox" className="flex flex-row py-4">
      {filter2Items.map((opt) => {
        return (
          <div className="pb-4" key={opt.url}>
          <Link href={`${opt.url}`}>
          <a>
         <Swatch
          key="Size"
          url={opt.url}
          active={opt.isActive}
          label={opt.name}
          variant={opt.value}
        />
        </a>
          </Link>
        </div>
        )
      })}
      </div>
  </div>
  )
}

export default memo(ProductOptions)

/**   og
 *  {options.map((opt) => (
      <div className="pb-4" key={opt.displayName}>
        <h2 className="uppercase font-medium text-sm tracking-wide">
          {opt.displayName}
        </h2>
        <div role="listbox" className="flex flex-row py-4">
          {opt.values.map((v, i: number) => {
            const active = selectedOptions[opt.displayName.toLowerCase()]
            return (
              <Swatch
                key={`${opt.id}-${i}`}
                active={v.label.toLowerCase() === active}
                variant={opt.displayName}
                color={v.hexColors ? v.hexColors[0] : ''}
                label={v.label}
                onClick={() => {
                  setSelectedOptions((selectedOptions) => {
                    return {
                      ...selectedOptions,
                      [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                    }
                  })
                }}
              />
            )
          })}
        </div>
      </div>
    ))}
  </div */