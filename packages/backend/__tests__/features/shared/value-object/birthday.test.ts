import { Birthday } from '../../../../src/features/shared/value-object/birthday';

describe('Birthday', () => {
  describe('constructor', () => {
    it('Date型の値で正常に初期化される', () => {
      const testDate = new Date('2000-01-15');
      const birthday = new Birthday(testDate);

      expect(birthday.value).toEqual(testDate);
    });

    it('引数なしの場合、20年前の日付で初期化される', () => {
      const birthday = new Birthday();
      const currentYear = new Date().getFullYear();
      const expectedYear = currentYear - 20;

      expect(birthday.value.getFullYear()).toBe(expectedYear);
    });

    it('無効なDate型の場合、エラーが投げられる', () => {
      const invalidDate = new Date('invalid-date');
      expect(() => {
        new Birthday(invalidDate);
      }).toThrow('Invalid date');
    });
  });

  describe('fromString', () => {
    it('文字列の値で正常に初期化される', () => {
      const dateString = '2000-01-15T00:00:00.000Z';
      const birthday = Birthday.fromString(dateString);

      expect(birthday.value).toEqual(new Date(dateString));
    });

    it('無効な文字列の場合、エラーが投げられる', () => {
      expect(() => {
        Birthday.fromString('invalid-date');
      }).toThrow('Invalid date format');
    });
  });

  describe('toString', () => {
    it('日付文字列形式で返される', () => {
      const testDate = new Date('2000-01-15');
      const birthday = new Birthday(testDate);

      expect(birthday.toString()).toBe(testDate.toDateString());
    });
  });

  describe('toISOString', () => {
    it('ISO 8601形式の文字列で返される', () => {
      const testDate = new Date('2000-01-15T00:00:00.000Z');
      const birthday = new Birthday(testDate);

      expect(birthday.toISOString()).toBe(testDate.toISOString());
    });
  });

  describe('fromZodData', () => {
    it('Zodスキーマデータから正常にインスタンスが作成される', () => {
      const testDate = new Date('2000-01-15');
      const zodData = { value: testDate };
      const birthday = Birthday.fromZodData(zodData);

      expect(birthday.value).toEqual(testDate);
    });
  });
});
