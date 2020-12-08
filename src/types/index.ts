export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: string;
  group: string;
  obs: string
  image: string
}

interface ImageProduct {
  asset: object | string
  mine: object | string
  path: object | string
}
