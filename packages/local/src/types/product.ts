//type för en enskild produkt 
export type ProductItem  ={
    name: string
    id : string
    brand: string
    color: string
    description : string
    isInStock :boolean
    showBuybutton : boolean
    showQuantityField : boolean
    stockStatusDescription : string
    url : string
    price : {
        currency : string
        formattedPrice : string
    }
    images : [
        {
            dimension : {
                height : number
                width: number
            },
            url : string
        }
    ]
    large_image: [
        {
            dimension : {
                height: number
                width : number
            },
            url : string
        }
    ]
    similarProducts? : []
    filter1Items : [
        {
            isActive : boolean
            value: string
            enabled : boolean
            name :string
            url : string
        }
    ]
    filter1Text : string
    filter2Items : [
        {
            isActive : boolean
            value: string
            enabled : boolean
            name :string
            url : string
        }
    ]
    filter2Text : string
} 
export type extensions = {
    CartContextId : string
}