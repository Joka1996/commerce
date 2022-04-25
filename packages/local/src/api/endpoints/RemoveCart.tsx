
import React, {Fragment, useState, useEffect} from "react";
import https from "https";
import fetch from "node-fetch";


//Radera ETT föremål från kassan
export default async function RemoveCart() { 


    //Rensa cookies
    // document.cookie = "cartContext=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    let RemoveCart = JSON.stringify({
        query: "mutation RemoveItemFromCart($item: RemoveItemFromCartType!) {\r\n cartRemoveItem (item: $item) {\r\n      result {\r\n      message\r\n          success\r\n    }\r\n      data {\r\n        ... cart\r\n      }\r\n    }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n    ...price\r\n    items {\r\n      id\r\n      articleNumber\r\n      description\r\n      quantity\r\n      formattedUnitPrice\r\n      unitPrice\r\n      ...price\r\n    }\r\n}",
        variables: {"item":{"id":"1"}}
      })
  
      const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });
  
        const response = await fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
            agent: httpsAgent,
            method: "POST",
            headers:  { "Content-Type": "application/json", "Accept": "application/json", 
            "Cart-Context-Id" : "CfDJ8C5VxuvQNgNMvfFSYAHiHJsJwJJuMO-3sBuns7e_zF5nUjLzA1AAIX9EeQc_JFmluMQHJ-wVtLUrflu9kRF7sqfEcenJqBHQokbNBLvKQfsJSn2X4abqvobIQiz9QFGykXfgvpKSKs24C9bPzSqLxIA" },
            //anväd query och variabel från createAcart
            body: RemoveCart,
        })
        try {
            const data = await response.json()
            console.log(data);
            //borde inte behöva returnera någon data?
            // return data 
        } catch (error) {
              console.log(error);
        }
}

// POSTMAN:
// var myHeaders = new Headers();
// myHeaders.append("Cart-Context-Id", "CfDJ8C5VxuvQNgNMvfFSYAHiHJv7Mk9b-odhevBFTwI0xq0mjJvHypDZlvM-NECHSsHzifgcv9Ahs_ksI5oqOX2qLqD4ddaqQ2lrV3nzbEm4kw_dEZlauBetAMy5GuB2YDlLYVi-mozke7xuxOi2OH5QmcY");
// myHeaders.append("Content-Type", "application/json");

// var graphql = JSON.stringify({
//   query: "mutation RemoveItemFromCart($item: RemoveItemFromCartType!) {\r\n cartRemoveItem (item: $item) {\r\n      result {\r\n      message\r\n          success\r\n    }\r\n      data {\r\n        ... cart\r\n      }\r\n    }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n    ...price\r\n    items {\r\n      id\r\n      articleNumber\r\n      description\r\n      quantity\r\n      formattedUnitPrice\r\n      unitPrice\r\n      ...price\r\n    }\r\n}",
//   variables: {"item":{"id":"1"}}
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