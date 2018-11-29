import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import './index.css';
import App from './containers/app';
import { unregister } from './registerServiceWorker';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
)

//ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
unregister();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
// import store, { history } from './store'

// import './index.css';
// import App from './containers/App';
// import registerServiceWorker from './registerServiceWorker';

// const target = document.querySelector('#root')

// render(
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//           <div>
//             <App />
//           </div>
//       </ConnectedRouter>
//     </Provider>,
//     target
// )

// registerServiceWorker();
