export interface CartItem{
    product_id? :number | undefined
    name?:string
    quantity?:number
    category?:string
    service_id?:number | undefined
    total_amount?:number
}

export interface CartListInterface{
    items:CartItem[],
    totalPrice:number
}

export interface UserDTO{
    id:string
    firstname:string
    lastname:string
    email:string
    mobilenumber:string
    address?:string
    gender:string
}

interface ProductDTO{
    id: number,
    name: string,
    category: string,
    total_units: number,
    cost_price: number,
    margin: number,
    selling_price: number,
    units_sold: number
}

interface ServiceDTO{
    id: number,
    name: string,
    charge: number
}

interface ItemDTO{
    id: number,
    product: ProductDTO | null,
    service: ServiceDTO | null,
    quantity: number,
    total_amount: number
}

export interface CartDTO{
    total_amount: number,
    items: ItemDTO[]
}
