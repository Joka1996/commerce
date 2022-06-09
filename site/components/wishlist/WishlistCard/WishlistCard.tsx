import { FC, useState } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import s from './WishlistCard.module.css'
import { Trash } from '@components/icons'
import { Button, Text } from '@components/ui'

import { useUI } from '@components/ui/context'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
// import useAddItem from '@framework/cart/use-add-item'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import type { Wishlist } from '@commerce/types/wishlist'

const placeholderImg = '/product-img-placeholder.svg'

const WishlistCard: React.FC<{
  item: Wishlist
}> = ({ item }) => {

  return (
    <div>
      wishlistCard
    </div>
  )
}

export default WishlistCard
