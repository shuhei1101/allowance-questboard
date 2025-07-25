from dataclasses import dataclass

from aqapi.language.repository.language_repository import LanguageRepository


@dataclass(frozen=True)
class GetInitDataCommand:
    """アプリ初期化データ取得コマンド"""
    language_repo: LanguageRepository
