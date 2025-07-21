# バックエンドのコマンド
#### venvの起動
```bash
source venv/bin/activate
```
#### venvの終了
```bash
deactivate
```
#### 依存関係のインストール
```bash
pip install -r requirements.txt
```
#### 開発サーバーの起動
```bash
uvicorn aqapi.main:app --host 0.0.0.0 --port 8000 --workers 2
```
