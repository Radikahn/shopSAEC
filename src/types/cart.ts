import type { Size } from '#/components/MainPage/SubDetails/ChooseSize'

export interface CartItem {
  item: string
  size: Size
  quantity: number
  price: number
}
