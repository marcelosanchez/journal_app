import React, { useEffect, useState } from 'react'
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [ checking, setChecking ] = useState(true); // true: cuando se carga la app, false: cuando ya se logueo
    const [ isLoggedIn, setIsLoggedIn ] = useState(false); // true: cuando se logueo, false: cuando no se logueo

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn( true );  // cuando se logueo esta variable cambia a true
                dispatch( startLoadingNotes (user.uid) )  // carga las notas del usuario
            } else {
                setIsLoggedIn( false );  // cuando se logueo esta variable cambia a true
            }
            setChecking( false );  // cuando se logueo, setChecking(false)
        } )
    }, [ dispatch, setChecking, setIsLoggedIn ]); // dispara la accion de login solo una vez
    
    if ( checking ) {  // true: cuando se carga la app, false: cuando ya se logueo
        return (
            <h1>Please wait..</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />

                    <PrivateRoute 
                        exact
                        path="/"
                        isAuthenticated={ isLoggedIn }
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
