// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import routes from '~react-pages';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        {useRoutes(routes)}
      </QueryClientProvider>
    </Suspense>
  );
}

const app = createRoot(document.getElementById('root') as HTMLElement);

app.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
