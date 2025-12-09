import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// process.env.PORTを使用し、フォールバックとしてポート3000を使用
const PORT = process.env.PORT || 3000;

// webServer.urlとuse.baseURLを正しく設定されたポートの場所で使用
const baseURL = `http://localhost:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // テスト毎のタイムアウト
  timeout: 30 * 1000,
  // テストディレクトリを指定
  testDir: path.join(__dirname, "tests"),
  // テストをファイル単位で並行実行する
  fullyParallel: true,
  // 事故的にtest.onlyがソースコードに残っている場合、CIビルドを失敗させる
  forbidOnly: !!process.env.CI,
  // テストが失敗した場合、さらに2回リトライする
  retries: 2,
  // CI環境では並列実行をオプトアウトする（実行しない）
  workers: process.env.CI ? 1 : undefined,
  // アーティファクト（スクリーンショット、ビデオ、トレース）を保存するフォルダ
  outputDir: "test-results/",
  // レポーターの設定　See https://playwright.dev/docs/test-reporters
  reporter: "html",
  // 全てのプロジェクトに共通の設定　See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // `await page.goto('')`のようなアクションで使用するベースURL
    // 詳細: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // トレースを収集する設定
    // 失敗したテストのトレースを有効にして、DOM、コンソールログ、ネットワークトラフィックなどを分析できるようにする
    // 詳細: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    // 利用可能なすべてのコンテキストオプション:
    // https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },

  // 主要なブラウザ用のプロジェクトを設定する
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    // モバイルのビューポート（横幅）に対するテスト
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: devices["iPhone 12"],
    },
  ],

  // ローカルの開発サーバーを起動してからテストを実行する
  // 詳細: https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "pnpm build && pnpm start",
    url: baseURL,
    timeout: 120 * 1000, // 起動タイムアウトを120秒に設定
    reuseExistingServer: !process.env.CI,
  },
});
