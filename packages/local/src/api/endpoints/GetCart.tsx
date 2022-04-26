
import React, {Fragment, useState, useEffect} from "react";
import https from "https";
import fetch from "node-fetch";

//Hämta kassan
export default async function GetCart(contextId: string){

    let GetCart = JSON.stringify({
        query: "query GetCart {\r\n  __typename\r\n  cart {\r\n    ...cart\r\n    shippingOptionId\r\n    paymentOptionId\r\n    supportedPaymentOptions {\r\n      ...cartOption\r\n    }\r\n    supportedShippingOptions {\r\n      ...cartOption\r\n    }\r\n    paymentWidget {\r\n      redirectUrl\r\n      responseString\r\n    }\r\n  }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n  ...price\r\n    items {\r\n    id\r\n    articleNumber\r\n    quantity\r\n    description\r\n    formattedUnitPrice\r\n    unitPrice\r\n    ...price\r\n    }\r\n}\r\n\r\nfragment cartOption on CartOptionType {\r\n  id\r\n  description\r\n  name\r\n}",
        variables: {}
    }
      )
  
      const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });
  
        const response = await fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
            agent: httpsAgent,
            method: "POST",
            headers:  { "Content-Type": "application/json", "Accept": "application/json", "Cookie": contextId,
            "Cart-Context-Id" : contextId },
            //anväd query och variabel från createAcart
            body: GetCart,
        })
        try {
            const data = await response.json()
            //logga allt som kassan innehåller. 
            // console.log(data);
            // console.log('*************');
            // console.log(contextId);
            return data 
        } catch (error) {
              console.log(error);
        }
}

/**
 * var myHeaders = new Headers();
myHeaders.append("Cart-Context-Id", "CfDJ8C5VxuvQNgNMvfFSYAHiHJv7Mk9b-odhevBFTwI0xq0mjJvHypDZlvM-NECHSsHzifgcv9Ahs_ksI5oqOX2qLqD4ddaqQ2lrV3nzbEm4kw_dEZlauBetAMy5GuB2YDlLYVi-mozke7xuxOi2OH5QmcY");
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "cart-context=CfDJ8C5VxuvQNgNMvfFSYAHiHJvUjOtW41DXu0dKYTtjC7wuhekcaoYWsZN_ZMJDKLv4W8DxNawZxQ0BbqOnemhNx-XeWFXOe6ZAkh3KMy-7_ja2yEm46gq_ohUTvL6f4pbEmnFW0XG-byO5svMbL1W6-y4");

var graphql = JSON.stringify({
  query: "query GetCart {\r\n  __typename\r\n  cart {\r\n    ...cart\r\n    shippingOptionId\r\n    paymentOptionId\r\n    supportedPaymentOptions {\r\n      ...cartOption\r\n    }\r\n    supportedShippingOptions {\r\n      ...cartOption\r\n    }\r\n    paymentWidget {\r\n      redirectUrl\r\n      responseString\r\n    }\r\n  }\r\n}\r\n\r\nfragment price on PriceInterfaceType {\r\n  formattedTotalPrice\r\n  totalPrice\r\n  vatAmount\r\n  vatRate\r\n}\r\n\r\nfragment cart on CartType {\r\n  ...price\r\n    items {\r\n    id\r\n    articleNumber\r\n    quantity\r\n    description\r\n    formattedUnitPrice\r\n    unitPrice\r\n    ...price\r\n    }\r\n}\r\n\r\nfragment cartOption on CartOptionType {\r\n  id\r\n  description\r\n  name\r\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://exjobb.localtest.me:5001/storefront.graphql", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 */