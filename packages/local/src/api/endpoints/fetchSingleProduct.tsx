
import React, {Fragment, useState, useEffect} from "react";
import https from "https";
import fetch from "node-fetch";
import { useRouter } from 'next/router'
import { stringify } from "querystring";
import { redirect } from "next/dist/server/api-utils";


//Fetch single product
export default async function GetSingleProduct(urlPath?: string) {
  // urlPath?:string
    // let result = urlPath?.slice(8);
    // console.log(result);
    // const router = useRouter();
    // const url = router.asPath;
    // //ta bort product från url
    // let result = url.slice(8)
    // // console.log(url);
    // const [param, setParam] = useState("");
  
    // //kontroll om router är redo
    // useEffect(()=>{
    //     console.log("useeffect triggerd");
    //     router.isReady? setParam(url as string) : console.log("router is nog ready");
    //     console.log({url});
    // }, [url])

    // console.log(urlPath);

//http://localhost:3000/product/court-dress-northern-green_l-637843150298977417
//https://exjobb.localtest.me:5001/woman/tops/court-dress-northern-green_l-637843150298977417

const GetContent= JSON.stringify ({
     query: "query GetContent($url: String!) {\r\n  content(url: $url) {\r\n    __typename\r\n\r\n    ... on RedirectContentType {\r\n      redirect\r\n    }\r\n\r\n    ... on TemplateAwareContentType {\r\n      id\r\n      template\r\n      metaTitle\r\n      metaDescription\r\n      framework {\r\n        footerNavigation\r\n        headerNavigation\r\n        primaryNavigation\r\n      }\r\n    }\r\n\r\n    ... on CategoryContentType {\r\n      metaTitle\r\n      metaDescription\r\n      products {\r\n        totalProducts\r\n        items {\r\n          ...productListItem\r\n        }\r\n      }\r\n      facetFilters {\r\n        ...facetFilterItems\r\n      }\r\n      sort {\r\n        enabled\r\n        name\r\n        url\r\n      }\r\n    }\r\n    ...productContent\r\n  }\r\n}\r\n\r\nfragment facetFilterItems on FacetGroupFilterType {\r\n  id\r\n  label\r\n  selectedOptions\r\n  singleSelect\r\n  options {\r\n    id\r\n    label\r\n    quantity\r\n  }\r\n}\r\n\r\n\r\nfragment image on ImageModelType {\r\n  dimension { \r\n    height\r\n    width\r\n  }\r\n  url\r\n}\r\n\r\n\r\nfragment filterItem on ProductFilterType {\r\n  isActive\r\n  value\r\n  enabled\r\n  name\r\n  url\r\n}\r\n\r\nfragment productListItem on ProductItemType {\r\n  name\r\n  id\r\n  brand\r\n  color\r\n  description\r\n  isInStock\r\n  showBuyButton\r\n  showQuantityField\r\n  stockStatusDescription\r\n  url\r\n  price {\r\n    currency\r\n    formattedPrice\r\n  }\r\n  images(max: {height: 1590, width: 1113}) {\r\n    ...image\r\n  }\r\n}\r\n\r\nfragment productContent on ContentInterfaceType {\r\n  ... on ProductContentInterfaceType {\r\n    popularProducts { \r\n      ...productListItem \r\n    }\r\n    productItem {\r\n      ...productListItem\r\n      large_image:images {\r\n        ...image\r\n      }\r\n    }\r\n    similarProducts {\r\n      ...productListItem\r\n    }\r\n  }\r\n\r\n  ... on ProductWithVariantsContentType {\r\n    filter1Items {\r\n      ...filterItem\r\n    }\r\n    filter1Text\r\n    filter2Items {\r\n      ...filterItem\r\n    }\r\n    filter2Text\r\n  }\r\n\r\n  ... on ProductWithVariantListContentType {\r\n    variants {\r\n      ...productListItem\r\n    }\r\n  }\r\n}",
      variables: {"url":"https://exjobb.localtest.me:5001"+urlPath}
});
//  console.log(GetContent);


//komma runt certifacate error.
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

 const response = await fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
    agent: httpsAgent,
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: GetContent,
    redirect: 'follow',
  })
  try {
     const  data  = await response.json()
    // console.log(data.data.content);
     
    //  let responseURL = "/product/"+data.data.content.productItem.name;
    //  window.location.href = responseURL;
     return data;
  } 
  catch (err) {
    console.log(err);
  }
}
