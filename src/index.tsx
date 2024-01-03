import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { container } from './container';
import { setUpStore } from './container/store';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import './index.scss';

const store = setUpStore(container);
const { App, ScrollToTop, ErrorHandler, appUpdateAvailable } = container;

createRoot(document.getElementById('root')!).render( // eslint-disable-line @typescript-eslint/no-non-null-assertion
  <Provider store={store}>
    <HashRouter>
      <ErrorHandler>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </ErrorHandler>
    </HashRouter>
  </Provider>,
);

// Learn more about service workers: https://cra.link/PWA
registerServiceWorker({
  onUpdate() {
    store.dispatch(appUpdateAvailable());
  },
});
