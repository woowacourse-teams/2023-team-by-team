import { URL_REGEX } from '~/constants/link';
import { generateHttpsUrl } from '~/utils/generateHttpsUrl';
import type { ParsedThreadContent } from '~/types/feed';

export const parseThreadContent = (rawContent: string) => {
  const splittedThreadContent =
    rawContent.match(/\S+(?=https?:\/\/)|https?:\/\/\S+|\s+|\S+/g) ?? [];
  const generatedThreadContent: ParsedThreadContent = [];
  let textContent = '';

  for (let i = 0; i < splittedThreadContent.length; i++) {
    const currentContent = splittedThreadContent[i];
    const isLink = URL_REGEX.test(currentContent);

    if (isLink && textContent !== '') {
      generatedThreadContent.push({
        type: 'text',
        text: textContent,
      });

      textContent = '';
    }

    if (isLink) {
      generatedThreadContent.push({
        type: 'link',
        text: splittedThreadContent[i],
        link: generateHttpsUrl(splittedThreadContent[i]),
      });

      continue;
    }

    textContent += splittedThreadContent[i];
  }

  if (textContent !== '') {
    generatedThreadContent.push({
      type: 'text',
      text: textContent,
    });
  }

  return generatedThreadContent;
};
