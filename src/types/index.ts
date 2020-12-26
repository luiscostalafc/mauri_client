export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  group: string;
  obs: string
  image: string
}

interface ImageProduct {
  asset: object | string
  mine: object | string
  path: object | string
}
