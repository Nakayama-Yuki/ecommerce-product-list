import { z } from "zod";

/**
 * 注文フォームのバリデーションスキーマ
 * - name: 必須、1-50文字
 * - email: 必須、有効なメールアドレス形式
 */
export const orderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "氏名は必須です" })
    .max(50, { message: "氏名は50文字以内で入力してください" }),
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
});

// 注文フォームの型定義
export type OrderFormData = z.infer<typeof orderSchema>;
