import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // テストディレクトリを指定
  testDir: "./tests",
  // テストをファイル単位で並行実行する
  fullyParallel: true,
  // 事故的にtest.onlyがソースコードに残っている場合、CIビルドを失敗させる
  forbidOnly: !!process.env.CI,
  // CI環境でのみテストをリトライする
  retries: process.env.CI ? 2 : 0,
  // CI環境では並列実行をオプトアウトする（実行しない）
  workers: process.env.CI ? 1 : undefined,
  // レポーターの設定　See https://playwright.dev/docs/test-reporters
  reporter: "html",
  // 全てのプロジェクトに共通の設定　See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // `await page.goto('')`のようなアクションで使用するベースURL
    baseURL: "http://localhost:3000",

    // トレースを収集する設定　See https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",
  },

  // 主要なブラウザ用のプロジェクトを設定する
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // モバイルのビューポート（横幅）に対するテスト
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // 有名なブラウザに対するテスト
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // ローカルの開発サーバーを起動してからテストを実行する
  // webServer: {
  //   command: "pnpm start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
