import { ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'
import type { items, LineItem } from '@commerce/types/cart'
 import usePrice from '@vercel/commerce-local/product/use-price' //klagar
//test with import from commerce and not framework
import useUpdateItem from '@vercel/commerce-local/cart/use-update-item' //klagar
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'
import GetCart from '@framework/api/endpoints/GetCart'
import RemoveCart from "@vercel/commerce-local/api/endpoints/RemoveCart"
// import RemoveCart from '@framework/api/endpoints/RemoveCart' //klagar
import AddToCart from '@framework/api/endpoints/AddToCart'
import UpdateCart from '@vercel/commerce-local/api/endpoints/UpdateCart'


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

  return (
   <div>An item</div>
  )
}

export default CartItem