name: 笑谱

on:
  workflow_dispatch:
  schedule:
    - cron: '19 */30 * * *'
  watch:
    types: started
  repository_dispatch:
    types: xp
jobs:
  build:

    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          repository: ZhiYi-N/script
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Cache node_modules
        uses: actions/cache@v2 # 使用 GitHub 官方缓存 Action。
        env:
          cache-name: cache-node-modules
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.cache-name }}-${{ hashFiles('package-lock.json') }} # 使用 package-lock.json 的 Hash 作为缓存的 key。也可以使用 package.json 代替
      - name: npm install
        run: |
          npm install
      - name: '运行 【笑谱】'
        run: |
          node iboxpay.js
        env:
                  node iboxpay.js
              env:
                REFRESHTOKEN: ${{ secrets.REFRESHTOKEN }}
                IBOXPAYVIDEOHEADER: ${{ secrets.IBOXPAYVIDEOHEADER }}
                IBOXPAYVIDEOBODY: ${{ secrets.IBOXPAYVIDEOBODY }}
                TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
                TG_USER_ID: ${{ secrets.TG_USER_ID }}