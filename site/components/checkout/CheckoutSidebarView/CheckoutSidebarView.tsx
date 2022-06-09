import Link from 'next/link'
import { FC, useState } from 'react'
import CartItem from '@components/cart/CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import useCheckout from '@framework/checkout/use-checkout'
import ShippingWidget from '../ShippingWidget'
import PaymentWidget from '../PaymentWidget'
import s from './CheckoutSidebarView.module.css'
import { useCheckoutContext } from '../context'
import GetCart from '@framework/api/endpoints/GetCart'

//ingen tur med detta än
// const getData = async () => {
//   try {
//     const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
//     let contextId = String(cookieObj.get("cartContext"));
//     return await GetCart(contextId)

//   } catch(error) {
//     console.log(error);
//   }
// }
// let getdata = await getData();


const CheckoutSidebarView: FC = () => {
  const { setSidebarView, closeSidebar } = useUI()
  //changed from getCart() to getData

  return (
    <SidebarLayout
      className={s.root}
      handleBack={() => setSidebarView('CART_VIEW')}
    >
      
    </SidebarLayout>
  )
}

export default CheckoutSidebarView
