import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  //kommenterat ut själv
  // selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'

interface ProductSidebarProps {
  product: Product
  data: any
  className?: string
}
  
const ProductSidebar: FC<ProductSidebarProps> = ({ product,data, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  
//kommenterat ut själv
  // useEffect(() => {
  //   selectDefaultOptionFromProduct(product, setSelectedOptions)
  // }, [product])

  // const variant = getProductVariant(product, selectedOptions)


    //kommenterat ut själv
  // const addToCart = async () => {
  //   setLoading(true)
  //   try {
  //     await addItem({
  //       productId: String(product.id),
  //       //kommenterat ut själv
  //       // variantId: String(variant ? variant.id : product.variants[0]?.id),
  //     })
  //     openSidebar()
  //     setLoading(false)
  //   } catch (err) {
  //     setLoading(false)
  //   }
  // }
  
      // product.filter1Items.map((options)=> (
      //   console.log(options)  
      // ))

  return (
    <div className={className}>
      <ProductOptions
      //ändrat från options till min egna prop, från productOptions
        options={data.data.content}
        filter1Items={data.data.content.filter1Items}
        filter1Text={data.data.content.filter1Text}
        filter2Items={data.data.content.filter2Items}
        filter2Text= {data.data.content.filter2Text}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
       {/* testning av filterItems */}
       {/* {console.log('*************')}
      {console.log(data.data.content)} */}

      <h2><b>{product.name}</b></h2>
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description} 
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>

      {/* <div>
        //kommenterat ut själv
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            //kommenterat ut själv
            // disabled={variant?.availableForSale === false}
          >
            {/* {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'} */}
          {/* </Button> */}
        {/* )} */}
      {/* </div> */} 

      <div className="mt-6">
        {/* <Collapse title="Care">
              Kanske ta bort hela care, finns inget som passar här
        </Collapse> */}
        <Collapse title="Details">
          {/* Lagt till själv */}
          Här ska nog lite CSS in.
            <ul >
                  <li key={product.brand}> <b>Brand:</b> {product.brand}</li>
                  <li key={product.color}><b>Color:</b> {product.color}</li>
                  <li key={product.price?.formattedPrice}><b>Price:</b> {product.price?.formattedPrice}</li>
                  {product.isInStock === true ? (
                    <li key={product.stockStatusDescription}><label><b>In stock:</b> </label> <input type="checkbox" readOnly checked title="In stock!"></input> {product.isInStock}</li>
                  ): null
                  }
                  {product.isInStock !== true ? (
                  <li key={product.stockStatusDescription}><label><b>In stock:</b> </label> <input type="checkbox" readOnly title="Not in stock!"></input> {product.isInStock}</li>
                  ): null}
            </ul>
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
