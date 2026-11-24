/**
 * Service Worker Type Declarations
 * Declares global types for web service workers
 */

declare const self: ServiceWorkerGlobalScope;

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): void;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  clients: Clients;
  registration: ServiceWorkerRegistration;
  addEventListener(event: 'install', listener: (event: ExtendableEvent) => void): void;
  addEventListener(event: 'activate', listener: (event: ExtendableEvent) => void): void;
  addEventListener(event: 'fetch', listener: (event: FetchEvent) => void): void;
}

interface Clients {
  claim(): Promise<void>;
  matchAll(options?: ClientMatchOptions): Promise<Client[]>;
}

interface Client {
  readonly id: string;
  readonly url: string;
  postMessage(message: any): void;
}

interface ClientMatchOptions {
  includeUncontrolled?: boolean;
  type?: 'window' | 'worker' | 'sharedworker' | 'all';
}
