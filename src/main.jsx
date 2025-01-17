import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import {  HelmetProvider } from 'react-helmet-async'


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
   <HelmetProvider>
    <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
    </HelmetProvider>
   </QueryClientProvider>
  </StrictMode>,
)
