import { calendarHandlers } from '~/mocks/handlers/calendar';
import { feedHandlers } from '~/mocks/handlers/feed';

export const handlers = [...calendarHandlers, ...feedHandlers];
