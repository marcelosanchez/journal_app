import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

const reducers = combineReducers({  // esta funcion es la que se encarga de combinar todos los reducers
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // esta funcion es para que funcione el redux devtools con el navegador
export const store = createStore(
    reducers,
    composeEnhancers(  // esta funcion es la que se encarga de combinar todos los reducers
        applyMiddleware( thunk )  // esta funcion tiene que estar en el ultimo parametro
    )
);