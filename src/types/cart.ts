import { Products } from "./products";

/**
 * カート内の商品アイテムの型定義
 * 商品情報に数量を追加したものです
 */
export interface CartItem extends Products {
  quantity: number;
}

/**
 * 注文データの型定義
 * 注文者の情報とカート内の商品リストです
 */
export interface Order {
  id: string;
  name: string;
  email: string;
  items: CartItem[];
  total: number;
  date: string;
}
