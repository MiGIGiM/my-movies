/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { useLottie } from 'lottie-react';
import ErrorAnimation from '../assets/animations/404.json';

type Props = { className: string };

const NotFound: FC<Props> = ({ className }) => {
  const options = {
    animationData: ErrorAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <main className={className}>{View}</main>;
};

export default NotFound;
