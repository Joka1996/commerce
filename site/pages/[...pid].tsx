import { useRouter } from 'next/router'
import GetSingleProduct from '@framework/api/endpoints/fetchSingleProduct'
import { ProductView } from '@components/product'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

 import getProductOperation from '@framework/api/operations/get-product'

 export async function getStaticProps({
    params,
    locale,
    locales,
    preview,
  }: GetStaticPropsContext<{ slug: string }>) {

    //få ut url ur params
    let url = Object.values(params);
    let saveURL ="";
    // console.log('****');
    url.forEach(element=> {
      saveURL = element.join("/");
    })
    // console.log(saveURL);
    const config = { locale, locales }
    const pagesPromise = commerce.getAllPages({ config, preview })
    const siteInfoPromise = commerce.getSiteInfo({ config, preview })
    const productPromise = GetSingleProduct(saveURL);
    // commerce.getProduct({
    //   variables: { slug: params!.slug },
    //   config,
    //   preview,
    // })

    const allProductsPromise = commerce.getAllProducts({
      variables: { first: 4 },
      config,
      preview,
    })
 
    const { pages } = await pagesPromise
    const { categories } = await siteInfoPromise
    //skicka url till fetch-funktionen
    //bytt ut product till data
    // console.log(test);
    const { data} = await productPromise;
    const { products: relatedProducts } = await allProductsPromise
  //   console.log('*************');
  //  console.log(data.content.productItem);


    if (!data) {
      throw new Error(`Product with slug '${params!.slug}' not found`)
    }

    return {
      props: {
        pages,
        data,
        relatedProducts,
        categories,
      },
      revalidate: 200,
    }
  }
  ////
  export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    const { products } = await commerce.getAllProductPaths()

    return {
      paths: locales
        ? locales.reduce<string[]>((arr, locale) => {
            // Add a product path for every locale
            products.forEach((product: any) => {
              arr.push(`/${locale}${product.url}`)
            })
            return arr
          }, [])
        : products.map((product: any) => `${product.url}`),
      fallback: 'blocking',
    }
  }
  export default function Woman({
    data,
    relatedProducts,
  }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    // console.log(data);
    // const urlPath = router.asPath;
    // console.log('*****');
    // console.log(urlPath);
//    product = await GetSingleProduct(urlPath);

    // console.log('*************');
    // console.log(product.data.content.productItem);

    return router.isFallback ? (
      <h1>Loading...</h1>
    ) : (
 //ändrat product till den befintliga och lagt till data
       <ProductView product={data.content.productItem} relatedProducts={relatedProducts} data={data} />
    )
  }
//  const Woman = async () => {
//   const router = useRouter()
// //   const { pid } = router.query
//   const urlPath = router.asPath;

// GetSingleProduct(urlPath);

//   return (
//     <ProductView product={product.data.content.productItem} relatedProducts={relatedProducts} data={product} />
//   )
//  }
// export default Woman
Woman.Layout = Layout
