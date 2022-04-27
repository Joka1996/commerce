import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import CreateCart from '@framework/api/endpoints/CreateCart'
import AddToCart from '@framework/api/endpoints/AddToCart'
import GetCart from '@framework/api/endpoints/GetCart'
import RemoveCart from '@framework/api/endpoints/RemoveCart'
import { CartSidebarView } from '@components/cart'

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
  // const addItem = useAddItem() //OG
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

//kommenterat ut själv
  // useEffect(() => {
  //   selectDefaultOptionFromProduct(product, setSelectedOptions)
  // }, [product])

  // const variant = getProductVariant(product, selectedOptions)
  


  const addToCart = async () => {
    setLoading(true)
    try {
      //skicka context-id och product-id till lägg i kassan.
      //Skapan en funktion för att kolla cookies, finns det en cookie lagrad använd den annars skapa ett cnytt contextid och lagra som cookie
      function setCookie(cname: string, cvalue: string, exdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      //Hämta cookien
      function getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      //kolla om kaka finns, finns den skicka till funktionen annars skapa en ny och skicka till funktionen 
      async function checkCookie() {    
        let cartContext = getCookie("cartContext");
        if (cartContext != "") {
          let productId = String(product.id);
          // console.log(cartContext);
          await AddToCart(productId, cartContext);
          //skicka även contextID till getCart
          await GetCart(cartContext);
        } else {
          let context = await CreateCart();
          let stringContext = String(context);
          //spara den nya som cookie, som kommer att lagras i 24h
          setCookie("cartContext", stringContext, 1)
          let productId = String(product.id);
          await AddToCart(productId, cartContext);
          //skicka även contextID till getCart
          await GetCart(cartContext);
        }
      }
      //kolla efter cookie
      await checkCookie()
   
      openSidebar()
      setLoading(false)
      // location.reload(); 

      //OG i denna try
      // await addItem({
      //   productId: String(product.id),
      //   //kommenterat ut själv
      //   // variantId: String(variant ? variant.id : product.variants[0]?.id),
      // })
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }
  console.log(product.id);

  return (
    <div className={className}>
      <ProductOptions
      //ändrat från options till min egna prop, från productOptions
        options={data.content}
        filter1Items={data.content.filter1Items}
        filter1Text={data.content.filter1Text}
        filter2Items={data.content.filter2Items}
        filter2Text= {data.content.filter2Text}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <h2><b>{product.name}</b></h2>
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description} 
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
       <div>
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            // disabled={variant?.availableForSale === false}
          >
            {/**Ändrat till egen type från litium. */}
            {product.isInStock === false
              ? 'Not Available'
              : 'Add To Cart'}
           </Button> 
      </div> 
      <div className="mt-6">
        {/* <Collapse title="Care">
              Kanske ta bort hela care, finns inget som passar här
        </Collapse> */}
        <Collapse title="Details">
          {/* Lagt till själv */}
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
