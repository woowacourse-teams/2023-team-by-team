import { authHandlers } from '~/mocks/handlers/auth';
import { calendarHandlers } from '~/mocks/handlers/calendar';
import { feedHandlers } from '~/mocks/handlers/feed';
import { teamHandlers } from '~/mocks/handlers/team';

export const handlers = [
  ...authHandlers,
  ...calendarHandlers,
  ...feedHandlers,
  ...teamHandlers,
];
