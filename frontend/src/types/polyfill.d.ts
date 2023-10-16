declare module 'event-source-polyfill' {
  class EventSourcePolyfill extends EventSource {
    constructor(url: string, eventSourceInitDict?: unknown);
  }
}
