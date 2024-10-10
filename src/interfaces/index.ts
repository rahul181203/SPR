export interface CartItem{
    product_id? :number | null
    name?:string
    quantity?:number
    category?:string
    service_id?:number | null
    total_amount?:number
}

export interface CartListInterface{
    items:CartItem[],
    totalPrice:number
}

export interface UserDTO{
    firstname:string
    lastname:string
    email:string
    mobilenumber:string
    address:string
    gender:string
}
