from dataclasses import dataclass
from typing import List
from aqapi.language.domain.language_type import LanguageType


@dataclass
class GetInitDataResult:
    """アプリ初期化データ取得結果"""
    languages: List[LanguageType]
