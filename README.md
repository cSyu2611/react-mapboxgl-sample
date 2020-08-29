# react-mapboxgl-sample

## Description
- mapbox-glのレイヤ着色サンプル　React実装
- ラッパーは用いず純正のみで実装しているため，Vueでの実装も処理フローはほぼ同じ
- Reactでの実装は，Reduxを用いていない点とHooksの点で差異があるのみ
- 今後の開発プロジェクトで，VueでもReactでもすぐ対応可能なようにプロトタイプとして作成
- mapbox-glのexpressionが慣れるまで面倒

## Related project
- [vue-mapboxgl-sample](https://github.com/cSyu2611/vue-mapboxgl-sample)

## Usage
src/config/env_tmp.jsをコピー＆リネーム
```
$ cp src/config/env_tmp.js src/config/env.js
```
env.js内
```
const mapboxAccessToken = "YOUR ACCESS TOKEN HERE";
```
にmapboxのアクセストークンを設定
同ファイル内
```
const demoAPI = "YOUR DEMO API URL HERE";
```
にAPIサーバのURLを指定

## Project setup
```
$ yarn install
$ yarn run serve
```
もしくはnpm
