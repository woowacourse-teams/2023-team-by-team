import { parseThreadContent } from '~/utils/parseThreadContent';

describe('링크, 텍스트 혼합 파싱 테스트', () => {
  it('링크가 주어지지 않는 경우, 텍스트로 간주하여 결과를 반환해야 한다.', () => {
    const rawMessage =
      '프로그래밍에서는 평균적인 수준의 노동력을 유지하는 것보다';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'text',
        text: '프로그래밍에서는 평균적인 수준의 노동력을 유지하는 것보다',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });

  it('whitespace로 시작하거나 끝나는 경우, whitespace가 여러 칸인 경우에도 결과가 보존되어야 한다.', () => {
    const rawMessage = '  영감이 샘물처럼 솟아나는 \t\n소중\r한     순간을 ';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'text',
        text: '  영감이 샘물처럼 솟아나는 \t\n소중\r한     순간을 ',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });

  it('링크와 텍스트가 섞여 있을 경우에는 이를 구분하여 결과를 반환해야 한다.', () => {
    const rawMessage = '놓치지 https://teamby.team/ 않는 것이 중요하다.';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'text',
        text: '놓치지 ',
      },
      {
        type: 'link',
        text: 'https://teamby.team/',
        link: 'https://teamby.team/',
      },
      {
        type: 'text',
        text: ' 않는 것이 중요하다.',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });

  it('https://로 시작하지 않는 링크의 경우, 클릭 시 이동되는 경로에는 https://가 앞에 붙어야 한다.', () => {
    const rawMessage = 'teamby.team';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'link',
        text: 'teamby.team',
        link: 'https://teamby.team',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });

  it('텍스트 바로 뒤에 https://로 시작하는 링크가 오는 경우, 텍스트와 링크를 구분하여야 한다.', () => {
    const rawMessage =
      '그래서 프로그래머에게https://www.jdoodle.com/online-compiler-c++/';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'text',
        text: '그래서 프로그래머에게',
      },
      {
        type: 'link',
        text: 'https://www.jdoodle.com/online-compiler-c++/',
        link: 'https://www.jdoodle.com/online-compiler-c++/',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });

  it('링크 뒤에 텍스트가 연달아 오는 경우에는 링크의 연장선상으로 생각하여 링크로 반환한다.', () => {
    const rawMessage =
      'https://www.jdoodle.com/online-compiler-c++/자유는 생명이다.';
    const parsedThreadContent = parseThreadContent(rawMessage);

    const expected = [
      {
        type: 'link',
        text: 'https://www.jdoodle.com/online-compiler-c++/자유는',
        link: 'https://www.jdoodle.com/online-compiler-c++/자유는',
      },
      {
        type: 'text',
        text: ' 생명이다.',
      },
    ];

    expect(parsedThreadContent).toEqual(expected);
  });
});
