```ts
import create from "zustand";

// まず型定義しとくのがベスト！
interface QuestFilter {
  // ここは基底クエストフィルターの中身に合わせて書いてね
  searchText: string;
  categoryId?: number;
  // 他に必要なフィールドもどんどん追加してOK
}

interface QuestSummary {
  id: number;
  title: string;
  // 他のプロパティも追加してね
}

interface QuestCategory {
  id: number;
  name: string;
  // 他も必要なら追加
}

interface QuestListState {
  questFilter: QuestFilter;
  questSummaries: QuestSummary[];
  questCategories: QuestCategory[];
  
  // 状態更新用の関数も定義しとこ！
  setQuestFilter: (filter: QuestFilter) => void;
  setQuestSummaries: (summaries: QuestSummary[]) => void;
  setQuestCategories: (categories: QuestCategory[]) => void;
}

export const useQuestListStore = create<QuestListState>((set) => ({
  questFilter: { searchText: "", categoryId: undefined },
  questSummaries: [],
  questCategories: [],

  setQuestFilter: (filter) => set({ questFilter: filter }),
  setQuestSummaries: (summaries) => set({ questSummaries: summaries }),
  setQuestCategories: (categories) => set({ questCategories: categories }),
}));
```
```ts
import React from "react";
import { useQuestListStore } from "./stores/questListStore";

const QuestList = () => {
  // Zustandのストアからクエストフィルターの状態を取り出す
  const questFilter = useQuestListStore((state) => state.questFilter);
  // クエストサマリーのリストも取り出す
  const questSummaries = useQuestListStore((state) => state.questSummaries);

  return (
    <div>
      <h2>クエスト一覧</h2>
      {/* 現在の検索キーワードを表示 */}
      <p>検索キーワード: {questFilter.searchText}</p>
      <ul>
        {/* クエストサマリーのタイトルをリストで表示 */}
        {questSummaries.map((q) => (
          <li key={q.id}>{q.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestList;

```


```ts
import React from "react";
import { useQuestListStore } from "./stores/questListStore";

const QuestFilterInput = () => {
  // Zustandのストアから現在のフィルター状態を取得
  const questFilter = useQuestListStore((state) => state.questFilter);
  // フィルターを更新する関数も取得
  const setQuestFilter = useQuestListStore((state) => state.setQuestFilter);

  // 入力値が変わったときのイベントハンドラ
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 今のフィルター内容をコピーして、searchTextだけ新しい値に更新してセット
    setQuestFilter({ ...questFilter, searchText: e.target.value });
  };

  return (
    <input
      type="text"
      value={questFilter.searchText} // 現在の検索キーワードを表示
      onChange={onChange}             // 入力変化時にフィルターを更新
      placeholder="クエストを検索"
    />
  );
};

export default QuestFilterInput;
```
