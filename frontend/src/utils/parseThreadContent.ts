import { URL_REGEX } from '~/constants/link';
import { generateHttpsUrl } from '~/utils/generateHttpsUrl';
import type { ParsedThreadContent } from '~/types/feed';

const LINK_SEPARATOR_REGEX = /\S+(?=https?:\/\/)|https?:\/\/\S+|\s+|\S+/g;

export const parseThreadContent = (rawContent: string) => {
  const splittedThreadContent = rawContent.match(LINK_SEPARATOR_REGEX) ?? [];
  const generatedThreadContent: ParsedThreadContent = [];
  let textContent = '';

  splittedThreadContent.forEach((currentContent) => {
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
        text: currentContent,
        link: generateHttpsUrl(currentContent),
      });
    } else {
      textContent += currentContent;
    }
  });

  if (textContent !== '') {
    generatedThreadContent.push({
      type: 'text',
      text: textContent,
    });
  }

  return generatedThreadContent;
};
