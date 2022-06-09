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


  return (
    <div className={className}>
        inget att se 
    </div>
  )
}

export default ProductSidebar
