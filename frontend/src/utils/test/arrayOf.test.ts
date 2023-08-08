import { arrayOf } from '~/utils/arrayOf';

describe('arrayOf', () => {
  it('인자로 전달받은 count 만큼의 길이를 갖는 배열을 반환한다.', () => {
    const count = 5;
    const result = arrayOf(count);

    expect(result.length).toBe(count);
  });
});
