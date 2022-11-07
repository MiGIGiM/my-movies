/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { useLottie } from 'lottie-react';
import loadingAnimation from '../assets/animations/loading.json';

type Props = { className: string };

const Loader: FC<Props> = ({ className }) => {
    const options = {
        animationData: loadingAnimation,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);

    return <main className={className}>{View}</main>;
};

export default Loader;
