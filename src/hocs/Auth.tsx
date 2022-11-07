/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import authStorage from '../services/storage/auth.storage';

const Auth: FC<PropsWithChildren> = ({ children }) => {
    const isLogged = authStorage.isLogged();

    if (!isLogged) return <Navigate to="/" replace />;

    return <>{children}</>;
};

export default Auth;
