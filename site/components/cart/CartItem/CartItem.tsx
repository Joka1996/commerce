import { ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'
import type { items, LineItem } from '@commerce/types/cart'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'
import GetCart from '@framework/api/endpoints/GetCart'
import RemoveCart from '@framework/api/endpoints/RemoveCart'
import AddToCart from '@framework/api/endpoints/AddToCart'
import UpdateCart from '@framework/api/endpoints/UpdateCart'


const placeholderImg = '/product-img-placeholder.svg'

const CartItem = ({
  //I item ligger nu mina props också
  item,
  // product,
  variant = 'default',
  // currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display'
  //Lagt till så den följer mina types
  item: items
  // product: any
  // currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  // const removeItem = useRemoveItem() //Orginal ta bort-funktion
  const updateItem = useUpdateItem({ item })
  const { openSidebar } = useUI()


  //ändrat denna till total och unitprice
  const { price } = usePrice({
    amount: item.totalPrice * item.quantity,
    baseAmount: item.unitPrice * item.quantity,
    // currencyCode,
  })
  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value))
    await updateItem({ quantity: Number(value) })
  }
//changed
  const increaseQuantity = async (n = 1) => {
    try {
      const quantity = Number(item.quantity) + n
      item.quantity = quantity
      setQuantity(quantity)
      
      const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
      let contextId = String(cookieObj.get("cartContext"));
      let productId = item.id;
      //send wanted quantatiy, productid and cart context id to function.
      return await UpdateCart(quantity, productId, contextId)
    }catch(error) {
      console.log(error);
    }
    // await updateItem({ quantity: val })
  }

  //Gjort om
  const handleRemove = async () => {
    setRemoving(true)
    try {
      //Hämta cookie
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
          let contextId = String(cookieObj.get("cartContext"));
          let productId = item.id;
          console.log(productId);
          // console.log(contextId);
          await RemoveCart(contextId, productId);
    // await removeItem(item) //orginal
    } catch (error) {
      setRemoving(false)
    }
  }

  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity])

  //get product url and slice the path
  let productUrl = item.url;
  let slicedUrl = productUrl.slice(32)
  
  return (
    <li
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          <Link href={`${slicedUrl}`}>
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={150}
                height={150}
                src={"https://exjobb.localtest.me:5001"+item.image || placeholderImg}
                objectFit='cover'
                alt={item.description}
                unoptimized
              />
            </a>
           </Link> 
        </div>

        <div className="flex-1 flex flex-col text-base">
          <Link href={`${slicedUrl}`}>
            <a>
              <span
                className={s.productName}
                onClick={() => closeSidebarIfPresent()}
              >
                {/* Ändrat  från name till description */}
                {item.description}
              </span>
            </a>
          </Link>
          <div className="flex flex-col justify-between space-y-2 text-sm">
          <span> {item.unitPrice * quantity} SEK</span>
        </div>
        {/*GJROT SJÄLV If color or size exist show it, else null */}
          <div className="flex items-center pb-1">
          {item.color != null ? (
            <div
            className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center">
              Color:
            <span
              className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
            style={{backgroundColor: `${item.color}`,}} >
          </span>
            </div>
            ): null}
            {item.size != null ? (
            <div
            className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center">
               Size: 
              <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
               {item.size}
              </span>
            </div>
            ):null}
          </div> 
        </div>
        </div>
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
    </li>
  )
}

export default CartItem