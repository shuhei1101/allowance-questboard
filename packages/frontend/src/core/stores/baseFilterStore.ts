export abstract class BaseFilterStore<FilterType, ErrorType> extends BaseFormStore<FilterType, ErrorType> {
  // 基本は BaseFormStore と同じだが、責務として「検索条件用」と明確化
}
