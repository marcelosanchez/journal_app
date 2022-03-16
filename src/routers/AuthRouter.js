import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginSceen } from '../components/auth/LoginSceen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-container'>
                <Switch>
                    <Route 
                        exact
                        path="/auth/login"
                        component={ LoginSceen }
                    />
                    <Route 
                        exact
                        path="/auth/register"
                        component={ RegisterScreen }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}
