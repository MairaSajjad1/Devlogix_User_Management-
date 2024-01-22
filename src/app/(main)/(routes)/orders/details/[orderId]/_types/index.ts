export interface OrderDetail {
    id: number
    business_id: number
    location_id: number
    order_no: string
    payment_status: string
    order_type: string
    final_total: number
    source: string
    address: string
    order_lines: OrderLine[]
    payment_lines: PaymentLine[]
    customer: Customer
  }
  
  export interface OrderLine {
    id: number
    order_id: number
    business_id: number
    product_id: number
    qty: number
    product: Product
  }
  
  export interface Product {
    id: number
    name: string
    description: string
    business_id: number
  }
  
  export interface ProductStock {
    id: number
    business_id: number
    location_id: number
    product_id: number
  }
  
  export interface PaymentLine {
    id: number
    order_id: number
    purchase_id: any
    business_id: number
    method: string
    amount: string
    type: string
  }
  
  export interface Customer {
    id: number
    name: string
    business_id: number
    mobile_no: string
    email: any
    city: any
    state: any
    landmark: any
    home_address: any
  }