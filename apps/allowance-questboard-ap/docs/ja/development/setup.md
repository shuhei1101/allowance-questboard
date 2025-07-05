# 🛠️ セットアップガイド

## 環境構築手順

### 1. 仮想環境の作成
```bash
# プロジェクトディレクトリに移動
cd allowance-questboard-api

# 仮想環境を作成
python -m venv venv
```

### 2. 仮想環境の有効化
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. 必要なパッケージのインストール
```bash
# requirements.txtから依存関係をインストール
pip install -r requirements.txt
```

### 4. 環境設定ファイルの準備
```bash
# サンプル環境設定ファイルをコピー
cp .env.sample .env
```

必要に応じて`.env`ファイルを編集してください。

### 5. 動作確認
```bash
# アプリケーションの起動確認
python -m aqapi.main
```

## 開発環境での作業

### 仮想環境の有効化（毎回必要）
開発作業を開始する前に、必ず仮想環境を有効化してください：

```bash
# 仮想環境の有効化
source venv/bin/activate  # macOS/Linux
# または
venv\Scripts\activate     # Windows
```

### 依存関係の更新
新しいパッケージが追加された場合：

```bash
# 依存関係を最新化
pip install -r requirements.txt
```

### 仮想環境の無効化
作業完了後に仮想環境を無効化：

```bash
deactivate
```

## トラブルシューティング

### 仮想環境の再作成
問題が発生した場合は、仮想環境を再作成してください：

```bash
# 既存の仮想環境を削除
rm -rf venv

# 新しい仮想環境を作成
python -m venv venv

# 仮想環境を有効化
source venv/bin/activate  # macOS/Linux

# 依存関係を再インストール
pip install -r requirements.txt
```