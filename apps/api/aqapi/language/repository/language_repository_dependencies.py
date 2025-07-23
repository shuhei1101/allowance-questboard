from dataclasses import dataclass

from aqapi.language.dao.language_dao import LanguageDao


@dataclass(frozen=True)
class LanguageRepositoryDependencies:
    """言語リポジトリの依存関係クラス"""
    
    language_dao: 'LanguageDao'
