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
// const getData = async () => {
//   try {
//     const cookieObj = new URLSearchParams(document.cookie.replaceAll("; ","&"))
//     let contextId = String(cookieObj.get("cartContext"));
//     return await GetCart(contextId)
//   } catch(error) {
//     console.log(error);
//   }
// }
// let cartData = await getData();


const CartSidebarView: FC = () => {

  const { closeSidebar, setSidebarView } = useUI()
 
  const handleClose = () => closeSidebar()

  return (
    <SidebarLayout
      handleClose={handleClose}>
        <p>Inget här!</p>
    </SidebarLayout>
  )
}

export default CartSidebarView