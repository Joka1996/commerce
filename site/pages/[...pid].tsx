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
  }: GetStaticPropsContext<{ pid:string[] }>) {

    //check if params is null
    if(params == null)
    return;
    //få ut url ur params
    let saveURL = params.pid.join("/");
    const config = { locale, locales }
    const pagesPromise = commerce.getAllPages({ config, preview })
    const siteInfoPromise = commerce.getSiteInfo({ config, preview })
    const productPromise = GetSingleProduct(saveURL);
 

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
      throw new Error(`Product with slug '${params!.pid}' not found`)
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
  ////måste vara med, men oklart vad det har för betydelse
  export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    //const { products } = await commerce.getAllProductPaths();
    console.log("");
    //console.log(products);
    const products: any[] = [];
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
    const myData = data as any;
    const myRelatedProducts = relatedProducts as any;

    return router.isFallback ? (
      <h1>Loading...</h1>
    ) : 
    ( 
      (myData.content.productItem != null) ? (
      //ändrat product till den befintliga och lagt till data
       <ProductView product={myData.content.productItem} relatedProducts={myRelatedProducts} data={myData} />
       )
       : console.log("Error, productItem null")
    )
  }
Woman.Layout = Layout
//hej