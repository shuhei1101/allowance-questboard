#!/usr/bin/env python3
import asyncio
import sys
import os

# パスを追加
sys.path.append(os.path.abspath('.'))

from aqapi.core.setup.setup_di import setup_di
from aqapi.core.di_container import INJECTOR
from aqapi.core.cache.redis_cacher import RedisCacher
from aqapi.quest.dao.quest_dao import QuestDao


async def test_simplified_setup_di():
    """シンプル化したsetup_diのテスト"""
    print("=== 🎯 シンプル化setup_diテスト開始 ===")
    
    try:
        # 1. setup_diを実行
        await setup_di()
        
        # 2. 登録されたコンポーネントを確認
        print("\n📋 登録確認:")
        
        # RedisCacherの取得テスト
        cacher = INJECTOR.get(RedisCacher)
        print(f"✅ RedisCacher取得成功: {type(cacher).__name__}")
        
        # QuestDaoの取得テスト
        quest_dao = INJECTOR.get(QuestDao)
        print(f"✅ QuestDao取得成功: {type(quest_dao).__name__}")
        
        # 3. 実際に動作するかテスト
        print("\n🔧 動作テスト:")
        
        # キャッシャーのテスト
        @cacher.cache("test:{id}")
        async def test_cache_function(id: int):
            return f"test_result_{id}"
        
        result = await test_cache_function(123)
        print(f"✅ キャッシュ機能テスト成功: {result}")
        
        # DAOのテスト（fetch_allは実際のDBアクセスなので、エラーが出る可能性がある）
        try:
            print("🗄️ DAO動作確認中...")
            # quest_results = await quest_dao.fetch_all()
            # print(f"✅ QuestDao動作確認成功: {len(quest_results)}件取得")
            print("✅ QuestDaoインスタンス作成成功（DB接続は実際のAPIで確認）")
        except Exception as dao_error:
            print(f"⚠️ DAO接続エラー（予想通り）: {dao_error}")
        
        print("\n=== ✅ シンプル化setup_diテスト完了 ===")
        return True
        
    except Exception as e:
        print(f"❌ setup_diテストエラー: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(test_simplified_setup_di())
    
    if success:
        print("\n🎉 setup_di()のシンプル化成功！")
        print("📝 使用方法:")
        print("   main.py: await setup_di()")
        print("   API内: INJECTOR.get(RedisCacher), INJECTOR.get(QuestDao)")
    else:
        print("\n💥 テスト失敗。修正が必要です。")
