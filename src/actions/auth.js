import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types"
import { noteLogout } from './notes';
import { startLoading, finishLoading } from "./ui";

// Accion asincrona: dispara una accion cuando se ejecuta la funcion asincrona
export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {  // retorna una funcion que se ejecuta en el dispatch thunk lo que hace es llamar al action
        dispatch( startLoading() );  // dispara la accion de loading
        
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ( { user } ) => {
            dispatch( login( user.uid, user.displayName ) );
            dispatch( finishLoading() );  // dispara la accion de finishLoading
        } )
        .catch( err => {
            dispatch( finishLoading() );  // dispara la accion de finishLoading
            Swal.fire('Fail', err.message, 'error');
        } );
    }
};

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {  // user es un objeto que viene de firebase
                await user.updateProfile({ displayName: name })  // actualiza el nombre del usuario
                
                dispatch(  // dispara una accion
                    login( user.uid, user.displayName )  // user.uid es el id del usuario y user.displayName es el nombre del usuario
                )
            })
            .catch( e => {
                Swal.fire('Fail', e.message, 'error');
            })
    }
};

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {  // user es un objeto que viene de firebase
                dispatch(  // dispara una accion
                    login( user.uid, user.displayName )  // user.uid es el id del usuario y user.displayName es el nombre del usuario
                )
            })
    }
};

// Accion: Login
export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

// Accion: Logout (asincrono)
export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

// Accion: Logout (sincrono)
export const logout = () => ({
    type: types.logout
})