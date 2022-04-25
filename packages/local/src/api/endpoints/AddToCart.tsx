
import React, {Fragment, useState, useEffect} from "react";
import https from "https";
import fetch from "node-fetch";


//Lägg i kassan
export default async function AddToCart(articleNumber:string, contextId:string ) { 
    //cartContext? : string, articleNumber?: string
    // cartContext = "" 
    // articleNumber ="4b3aab05-ff67-49c7-a3f6-5ed56d0a153e"


    let addCart = JSON.stringify({
        query: "mutation AddItemToCart($item: AddItemToCartType!) {\r\n cartAddItem (item: $item) {\r\n      result {\r\n      message\r\n      success\r\n    }\r\n      data {\r\n        ... cart\r\n      }\r\n    }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n    ...price\r\n    items {\r\n      id\r\n      articleNumber\r\n      quantity\r\n      formattedUnitPrice\r\n      unitPrice\r\n      ...price\r\n    }\r\n}",
        variables: {"item":{"articleNumber": articleNumber}}
      })
  
      const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });
  
        const response = await fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
            agent: httpsAgent,
            method: "POST",
            headers:  { "Content-Type": "application/json", "Accept": "application/json", 
            "Cart-Context-Id" : contextId },
            //anväd query och variabel från createAcart
            body: addCart,
        })
        try {
            const data = await response.json()
            // console.log(data);
            return data 
        } catch (error) {
              console.log(error);
        }
}

// POSTMAN:
// var myHeaders = new Headers();
// myHeaders.append("Cart-Context-Id", "CfDJ8C5VxuvQNgNMvfFSYAHiHJv7Mk9b-odhevBFTwI0xq0mjJvHypDZlvM-NECHSsHzifgcv9Ahs_ksI5oqOX2qLqD4ddaqQ2lrV3nzbEm4kw_dEZlauBetAMy5GuB2YDlLYVi-mozke7xuxOi2OH5QmcY");
// myHeaders.append("Accept", "application/json");
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "cart-context=CfDJ8C5VxuvQNgNMvfFSYAHiHJvUjOtW41DXu0dKYTtjC7wuhekcaoYWsZN_ZMJDKLv4W8DxNawZxQ0BbqOnemhNx-XeWFXOe6ZAkh3KMy-7_ja2yEm46gq_ohUTvL6f4pbEmnFW0XG-byO5svMbL1W6-y4");

// var graphql = JSON.stringify({
//   query: "mutation AddItemToCart($item: AddItemToCartType!) {\r\n cartAddItem (item: $item) {\r\n      result {\r\n      message\r\n      success\r\n    }\r\n      data {\r\n        ... cart\r\n      }\r\n    }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n    ...price\r\n    items {\r\n      id\r\n      articleNumber\r\n      quantity\r\n      formattedUnitPrice\r\n      unitPrice\r\n      ...price\r\n    }\r\n}",
//   variables: {"item":{"articleNumber":"essentialseamlesstights-m-002-637843150298977417"}}
// })
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: graphql,
//   redirect: 'follow'
// };

// fetch("https://exjobb.localtest.me:5001/storefront.graphql", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));