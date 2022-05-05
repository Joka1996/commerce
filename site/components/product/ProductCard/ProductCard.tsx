import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'
import GetSingleProduct from '@framework/api/endpoints/fetchSingleProduct'
import React, { useState, useEffect,ChangeEvent} from "react";

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

    //i denna fil har jag anpassat bilder, samt bytt till formattedPrice
    //loader 
    const externaImageLoader = ({ src, width }: { src: string, width:number }) =>
  `https://localtest.me:5001${src}?w=${width}`;
  

  return (
    //ändrat till url från slug
    <Link  href={`${product.url}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
          { /* Detta är rullistan på framsidan */}
            <div className={s.header}>
              <span>{product.name} </span>
            </div>
            {product?.images && (
              <div>
                <Image
                  quality="85"
                  //lagt till egen loader
                  loader={externaImageLoader}
                  src={product.images[0].url ||placeholderImg}
                  alt={product.name || 'Product Image'}
                  // anpassat bild-storlekar
                  height={300}
                  width={240}
                  layout="fixed"
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}
    {/**Slut rullista */}
        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>
                  {`${price} ${product.price?.currencyCode}`}
                </div>
              </div>
            )}
            {/* Detta är "Liknand produkter" som visas på produk-sidan */}
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    height={200}
                    width={140}
                  //lagt till egen loader
                    loader={externaImageLoader}
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    quality="85"
                    layout="responsive"
                    //lagt till objectfit
                    objectFit='contain'
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}
        {/**Detta är de stora produkt-divarna på hem */}
        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.formattedPrice}`}
            />
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  {/* dessa är de stora bilderna */}
                  <Image
                    height={1590} 
                    width={1113}
                    loader={externaImageLoader}
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[3]?.url || placeholderImg}
                    quality="85"
                    layout="responsive"
                     //lagt till contain så att bilden krymper något
                    objectFit='contain'
                    sizes="50vw"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
