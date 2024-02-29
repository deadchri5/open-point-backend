export default interface ProductDto {
  id?: number
  provider_id?: number
  brand_id?: number
  product_price_id: number
  product_info_id: number
  category_id: number
  sku: string
  ean: number
  status: boolean
  stock: number
  stock_fill_margin: number
  created_at: Date
  updated_at: Date
}
