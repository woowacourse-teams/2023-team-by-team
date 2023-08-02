import { calendarHandlers } from '~/mocks/handlers/calendar';
import { feedHandlers } from '~/mocks/handlers/feed';
import { teamHandlers } from './team';

export const handlers = [...calendarHandlers, ...feedHandlers, ...teamHandlers];
