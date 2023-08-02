import { calendarHandlers } from '~/mocks/handlers/calendar';
import { feedHandlers } from '~/mocks/handlers/feed';
import { teamHandlers } from '~/mocks/handlers/team';

export const handlers = [...calendarHandlers, ...feedHandlers, ...teamHandlers];
