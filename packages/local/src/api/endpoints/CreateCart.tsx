
import React, {Fragment, useState, useEffect} from "react";
import https from "https";
import fetch from "node-fetch";
// import AddToCart from "./AddToCart";

//skapa ett kassa-context
export default async function CreateCart() {

    let createACart = JSON.stringify({
      query: "mutation CreateCartContext($url: String!) {\r\n cartCreate (url: $url) {\r\n      result {\r\n      message\r\n      success\r\n    }\r\n  }\r\n}",
      variables: {"url":"https://exjobb.localtest.me:5001/"}
    })

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

      const response = await fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
          agent: httpsAgent,
          method: "POST",
          headers:  { "Content-Type": "application/json", "Accept": "application/json",  },
          //anväd query och variabel från createAcart
          body: createACart,
      })
      try {
          const data = await response.json();
          let cartContext = data.extensions["Cart-Context-Id"];
          //Logga den nya cartContext-id
          console.log('***');
          console.log(cartContext);
          console.log('***');
          //retuerna id
          return data.extensions["Cart-Context-Id"];
      } catch (error) {
            console.log(error);
      }
}

/***
 POSTMAN:
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "cart-context=CfDJ8C5VxuvQNgNMvfFSYAHiHJvUjOtW41DXu0dKYTtjC7wuhekcaoYWsZN_ZMJDKLv4W8DxNawZxQ0BbqOnemhNx-XeWFXOe6ZAkh3KMy-7_ja2yEm46gq_ohUTvL6f4pbEmnFW0XG-byO5svMbL1W6-y4");

  var graphql = JSON.stringify({
    query: "mutation CreateCartContext($url: String!) {\r\n cartCreate (url: $url) {\r\n      result {\r\n      message\r\n      success\r\n    }\r\n  }\r\n}",
    variables: {"url":"https://exjobb.localtest.me:5001/"}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  fetch("https://exjobb.localtest.me:5001/storefront.graphql", {
    method: 'POST',
    headers: {"Content-Type": "application/json",
    "Cookie": "cart-context=CfDJ8C5VxuvQNgNMvfFSYAHiHJvUjOtW41DXu0dKYTtjC7wuhekcaoYWsZN_ZMJDKLv4W8DxNawZxQ0BbqOnemhNx-XeWFXOe6ZAkh3KMy-7_ja2yEm46gq_ohUTvL6f4pbEmnFW0XG-byO5svMbL1W6-y4" },
    body: graphql,
    redirect: 'follow'
  })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 */