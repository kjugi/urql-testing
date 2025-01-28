import { createRoot } from 'react-dom/client';
import { App } from './App'
import { Provider } from 'urql';
import { client } from './client';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
    <Provider value={client}>
        <App />
    </Provider>
);