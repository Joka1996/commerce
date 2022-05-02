import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import GetCart from '@framework/api/endpoints/GetCart'
import { Product } from '@commerce/types/product'

//Hämta cookies och skicka context till GetCart
const getData = async () => {
  try {
    const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
    let contextId = String(cookieObj.get("cartContext"));
    return await GetCart(contextId)

  } catch(error) {
    console.log(error);
  }
}
let cartData = await getData();

//testa att skicka produkt-datan hit
interface CartSidebarViewProps {
  product?: Product
}

const CartSidebarView: FC<CartSidebarViewProps> = ({ product}) => {

  // console.log(cartData.data.cart.items);
  //Egen data 
  let data = cartData.data.cart;

  //sätt dessa till false så att kassan visas
  let isLoading = false;
  let isEmpty = false;
  // console.log(data);

  const { closeSidebar, setSidebarView } = useUI()

  //byta ut useCart data till egna getCart  
  // const {data, isLoading, isEmpty} = useCart() // orginal-lösning

  const { price: subTotal } = usePrice(
    data && {
      //bytt ut subtotal till unitPrice
      amount: Number(data.unitPrice),
      //bytt ut currency.code
      currencyCode: data.formattedPrice,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.formattedTotalPrice),
      //bytt ut currency.code
      currencyCode: data.formattedPrice,
    }
  )
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
       {/* isLoading || isEmpty */}
       {/* Om det inte finns något i data, visa då cart is empty */}
      { data === null  ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : ( 
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <a>
                <Text variant="sectionHeading" onClick={handleClose}>
                  My Cart
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {/* Bytt ut till cartData  */}
             {data.items.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  //Här skulle jag vilja skicka med alla data, då kan jag plocka upp bilder, id osv.
                  // currencyCode={data!.formattedTotalPrice}
                />
              ))}
            </ul> 
         </div> 

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{data.totalPrice} SEK</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>{data.vatAmount} SEK</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              {/* Denna behövs inte då den räknar själv */}
              {/* <span>{total}</span> */}
              <span>{data.totalPrice} SEK</span>
            </div>
            <div>
              {/* {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({data.totalPrice})
                </Button>
              ) : ( */}
                <Button href="/checkout" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              {/* )} */}
            </div>
          </div>
        </>
       )}  
    </SidebarLayout>
  )
}

export default CartSidebarView
