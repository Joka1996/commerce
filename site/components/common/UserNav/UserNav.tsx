import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import { Heart, Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React, { useEffect, useState} from 'react'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'

import GetCart from '@framework/api/endpoints/GetCart'

//ingen tur än med detta
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
console.log(cartData);

//Lagt till items
import type {LineItem, items } from '@commerce/types/cart'

//ändrat från items:LineItems till nuvarnade
const countItem =  (count: number, item: items) => count + item.quantity

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  //samma här med at byta ut data
  // const { data } = useCart()

  const data = cartData;
  // console.log(data);

  const { data: isCustomerLoggedIn } = useCustomer()
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    setSidebarView,
    openSidebar,
  } = useUI()

  const itemsCount = 5
  // data?.items.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {/* {process.env.COMMERCE_CART_ENABLED && ( */}
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Button>
          </li>





        {/* )} */}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
      )} 
      {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && ( 
          <li className={s.item}>
            <Dropdown>
              <DropdownTrigger>
                <button
                  aria-label="Menu"
                  className={s.avatarButton}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  <Avatar />
                </button>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )} 
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              openSidebar()
              setSidebarView('MOBILE_MENU_VIEW')
            }}
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
