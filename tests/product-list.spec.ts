import { test, expect } from '@playwright/test';

/**
 * 製品一覧ページのE2Eテスト
 * Fake Store APIから商品データを取得し、UIに正しく表示されることを検証
 */
test.describe('Product List Page', () => {
  test.beforeEach(async ({ page }) => {
    // メインページ（製品一覧）へ遷移
    await page.goto('/');
  });

  test('Display product list from Fake Store API', async ({ page }) => {
    await test.step('Verify page heading', async () => {
      // メイン見出しの確認
      await expect(page.getByRole('heading', { name: '製品一覧', level: 1 })).toBeVisible();
    });

    await test.step('Verify product cards are displayed', async () => {
      // カート追加ボタンが表示されるまで待機（API取得・商品表示完了後）
      // Fake Store APIは20件の商品を返すため、複数のカート追加ボタンが存在する
      const addToCartButtons = page.getByRole('button', { name: 'カートに追加' });
      await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
      
      // 複数の商品が表示されることを確認（最低5件以上）
      const count = await addToCartButtons.count();
      expect(count).toBeGreaterThanOrEqual(5);
    });

    await test.step('Verify product card structure', async () => {
      // 商品画像が表示されること（最低1件）
      const productImages = page.locator('img[alt]').filter({ hasNotText: '' });
      await expect(productImages.first()).toBeVisible();
      
      // 商品タイトル（h2見出し）が表示されること
      const productTitles = page.getByRole('heading', { level: 2 });
      await expect(productTitles.first()).toBeVisible();
      
      // 価格表示（¥記号を含むテキスト）が表示されること
      await expect(page.getByText(/¥\d+/).first()).toBeVisible();
    });
  });
});
