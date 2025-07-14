class FamilyQuestQueryModel:
    """家族クエスト情報のQueryModel
    
    QueryServiceでJOINしたテーブルの全ての情報を格納するクラス。
    SQLのクエリ結果とAPIレスポンスの間の中間表現として使用。
    """
    
    def __init__(self, id: int, title: str, category_id: int, icon_id: int,
                 is_shared: bool, is_public: Optional[bool], child_id: int,
                 child_icon_id: Optional[int]):
        # FamilyQuestsEntity からの情報
        self.id = id  # クエストID
        self.is_shared = is_shared  # 共有フラグ
        
        # QuestsEntity からの情報
        self.category_id = category_id  # カテゴリID
        self.icon_id = icon_id  # アイコンID
        
        # QuestsTranslationEntity からの情報
        self.title = title  # クエスト名（翻訳済み）
        
        # SharedQuestsEntity からの情報
        self.is_public = is_public  # 公開フラグ
        
        # ChildrenEntity からの情報
        self.child_id = child_id  # 子供ID
        
        # FamilyMembersEntity からの情報
        self.child_icon_id = child_icon_id  # 子供のアイコンID

    @classmethod
    def from_row(cls, row) -> "FamilyQuestQueryModel":
        """SQLクエリ結果の行からQueryModelを作成"""
        return cls(
            id=row.id,
            title=row.title,
            category_id=row.category_id,
            icon_id=row.icon_id,
            is_shared=row.is_shared,
            is_public=row.is_public,
            child_id=row.child_id,
            child_icon_id=row.child_icon_id
        )