# 🧪 Submodule操作テストスクリプト

## このテストの目的
このスクリプトは、submodulesのapリポジトリの情報を取得や編集が可能かテストするために作成されました。

## テスト内容

### 1. Submodule情報の取得テスト
```bash
#!/bin/bash
echo "=== Submodule Status ==="
git submodule status

echo -e "\n=== Submodule Configuration ==="
git config --list | grep submodule

echo -e "\n=== Git Tree Structure ==="
git ls-tree HEAD submodules/

echo -e "\n=== Submodule URLs ==="
git config --get-regexp submodule.*url
```

### 2. Submodule参照変更テスト（読み取り専用）
```bash
#!/bin/bash
echo "=== Current AP Submodule Commit ==="
git ls-tree HEAD submodules/ap

echo -e "\n=== Submodule Remote Info ==="
cd submodules/ap 2>/dev/null && git remote -v 2>/dev/null || echo "Submodule not initialized"
```

## 🚫 制限事項
- 実際のファイル内容の編集には認証が必要
- GitHub APIでのアクセスも権限制限あり

## ✅ 実行可能な操作
- Submodule設定の確認
- 参照コミットハッシュの取得
- .gitmodulesファイルの編集（理論的には可能）