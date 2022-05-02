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


type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
  //Lagt till detta under, den har av någon anledning props här o inte i type filen
  articleNumber: string
  description: string
  formattedTotalPrice: string
  formattedUnitPrice: string
  id: string
  quantity: number
  totalPrice: number
  unitPrice: number
  vatAmount: number
  vatRate: number
}

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

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    setQuantity(val)
    await updateItem({ quantity: val })
  }

  //Egen. Denna ksickar samma artikelnummer som redan är tillagt, det som vill skickas är productID
  const handleAdditem = async () => {
    try{
      const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
      let contextId = String(cookieObj.get("cartContext"));
      let articleNumber = item.articleNumber;
      console.log(articleNumber);
      await AddToCart(articleNumber, contextId );
    } catch(error) {
      console.log(error);
    }
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
      //loader för bilder
      const ImageLoader = ({ src }: { src: string }) =>
      `https://localtest.me:5001${src}`;
  return (
    <li
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          {/* <Link href={`/product/${item.url}`}> */}
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={150}
                height={150}
                // loader={ImageLoader} //  fungerar inte?
                src={"https://exjobb.localtest.me:5001"+item.image ||placeholderImg}
                objectFit='cover'
                alt={"Product Image"}
                unoptimized
              />
            </a>
           {/* </Link>  */}
        </div>
        <div className="flex-1 flex flex-col text-base">
          {/* <Link href={`/product/${item.path}`}> */}
            <a>
              <span
                className={s.productName}
                onClick={() => closeSidebarIfPresent()}
              >
                {/* Ändrat  från name till description */}
                {item.description}
              </span>
            </a>
          {/* </Link> */}
          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map((option: ItemOption, i: number) => (
                <div
                  key={`${item.id}-${option.name}`}
                  className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                >
                {/* Ändrat  från name till description */}
                  {option.description}
                  {option.name === 'Color' ? (
                    <span
                      className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.value}`,
                      }}
                    ></span>
                  ) : (
                    <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div> 
          )} 
         {variant === 'display' && (
            <div className="text-sm tracking-wider">{quantity}x</div>
          )} 
        </div>
        </div>
        {/*  <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price} {item.unitPrice} SEK</span>
     
      </div>
      {/* {variant === 'default' && ( */}
        <Quantity
          value={item.quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          handleAdditem={handleAdditem}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
          
        />
      {/* )} */}
    </li>
  )
}

export default CartItem
