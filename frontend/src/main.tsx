import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { SWRConfig } from 'swr';
import {AuthProvider} from './store/auth';
import './lib/axios.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <SWRConfig value={{
          refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </AuthProvider>
)
