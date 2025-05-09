import Link from "next/link";

interface OrderCompletionProps {
  orderId: string; // The unique identifier for the order
}

/**
 * 注文完了画面コンポーネント
 * 注文完了後に表示され、注文IDと買い物を続けるためのリンクを提供します
 *
 * @param orderId - 注文ID
 */
export function OrderCompletion({ orderId }: OrderCompletionProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          ご注文ありがとうございます
        </h2>
      </div>

      <p className="text-gray-600 mb-4">
        ご注文が正常に処理されました。注文の詳細は登録されたメールアドレスに送信されます。
      </p>

      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="text-sm text-gray-500">注文番号</p>
        <p className="font-mono text-lg font-semibold">{orderId}</p>
      </div>

      <Link
        href="/"
        aria-label="ショッピングを続ける"
        className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors text-center">
        ショッピングを続ける
      </Link>
    </div>
  );
}
