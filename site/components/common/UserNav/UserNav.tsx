import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
// import useCart from '@framework/cart/use-cart'
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

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  //samma här med at byta ut data
  
  return (
    <nav className={cn(s.root, className)}>
  
    </nav>
  )
}

export default UserNav
