# 値オブジェクト

## 目次
- [目次](#目次)
- [TestTitle](#testtitle)
  - [メンバ](#メンバ)
  - [バリデーション](#バリデーション)
- [TestName](#testname)
  - [メンバ](#メンバ-1)
  - [バリデーション](#バリデーション-1)
- [TestMoney](#testmoney)
  - [メンバ](#メンバ-2)
  - [バリデーション](#バリデーション-2)
- [TestMailaddress](#testmailaddress)
  - [メンバ](#メンバ-3)
  - [バリデーション](#バリデーション-3)
- [TestDate](#testdate)
  - [メンバ](#メンバ-4)
  - [バリデーション](#バリデーション-4)
- [TestUrl](#testurl)
  - [メンバ](#メンバ-5)
  - [バリデーション](#バリデーション-5)

## TestTitle
### メンバ
- int value: タイトル

### バリデーション
- 必須
- 最大文字数: 100文字

## TestName
### メンバ
- String value: 名前

### バリデーション
- 必須
- 最大文字数: 50文字

## TestMoney
### メンバ
- int value: 金額

### バリデーション
- 必須
- 最小値: 0
- 最大値: 1000000
- 数値

## TestMailaddress
### メンバ
- String value: メールアドレス

### バリデーション
- 必須
- メールアドレス形式

## TestDate
### メンバ
- DateTime value: 日付

### バリデーション
- 必須
- 日付形式: YYYY-MM-DD

## TestUrl
### メンバ
- String value: URL

### バリデーション
- 必須
- URL形式
- 半角英数字
