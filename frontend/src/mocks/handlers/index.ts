import { calendarHandlers } from '~/mocks/handlers/calendar';
import { feedHandlers } from '~/mocks/handlers/feed';
import { LinkHandlers } from '~/mocks/handlers/link';
import { teamHandlers } from '~/mocks/handlers/team';

export const handlers = [
  ...calendarHandlers,
  ...feedHandlers,
  ...teamHandlers,
  ...LinkHandlers,
];
