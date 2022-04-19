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

  //skapa en tom array som ska ha allt innehåll?
  // const test= [];
  // let colorText = filter1Text;
  // let sizeText =  filter2Text
  // //loopa igenom och push till den nya.
  // for(let color of  filter1Items){
  //   for(let size of filter2Items ){
  //     test.push(color, size,);
  //   }
  // }
  
  //Gör om till text
  let sizeText = filter2Text.toString();
  let colorText = filter1Text.toString();

  return (
    <div>
      {/* FÄRG */}
        <h2 className="uppercase font-medium text-sm tracking-wide">
          {filter1Text}
        </h2>
        <div role="listbox" className="flex flex-row py-4">
      {filter1Items.map((opt) => {
        {/* {console.log(opt.value)} */}
        // const active = selectedOptions[opt.name.toLocaleLowerCase()]
        return (
          <Link href={`/product${opt.url}`}>
          <div className="pb-4" key={opt.url}>
         <Swatch
          key="Color"
          color={opt.value}
          active={opt.isActive}
          label={opt.name}
          variant={opt.value}
          // onClick={() => {
          //   setSelectedOptions((selectedOptions) => {
          //     return {
          //       ...selectedOptions,
          //       //Här vill jag skicka med Text (filter1Text) + färg, alltså färg och ex green
          //       [colorText.toLowerCase()]: v.value.toLowerCase(),
          //     }
          //   })
          // }}
        />
        </div>
        </Link>
        )
      })}
      </div>

        {/* <div role="listbox" className="flex flex-row py-4">
      {filter1Items.map((opt) => (
 
      <div className="pb-4" key={opt.url}>
        <Swatch
          key="Color"
          // active={v.label.toLowerCase() === active}
          active={opt.isActive}
          value={opt.value}
          //color={hexColors ? v.hexColors[0] : ''}
          color={opt.value}
          onClick={() => {
            setSelectedOptions((selectedOptions) => {
              return {
                ...selectedOptions,
                [opt.value.toLowerCase()]: opt.value.toLowerCase(),
              }
            })
          }}
        />
        </div>
    ))}
     </div> */}

     {/* SIZE */}
     <h2 className="uppercase font-medium text-sm tracking-wide">
     {filter2Text}
        </h2>
        <div role="listbox" className="flex flex-row py-4">
      {filter2Items.map((v, i: number) => {
        {/* {console.log(opt.value)} */}
        const active = selectedOptions[v.name.toLocaleLowerCase()]
        return (
          <Link href={`/product${v.url}`}>

          <div className="pb-4" key={v.url}>
         <Swatch
          key="Size"
          url={v.url}
          active={v.isActive}
          label={v.name}
          variant={v.value}
          // onClick={() => {
          //   setSelectedOptions((selectedOptions) => {
          //     return {
          //       ...selectedOptions,
          //       //Här vill jag skicka med Text (filter2Text) + storlek, alltså Size och ex L
          //       [sizeText.toLowerCase()]: v.value.toLowerCase(),
          //     }
          //   })
          // }}
        />
        </div>
        </Link>
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