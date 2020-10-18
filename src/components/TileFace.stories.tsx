import React from 'react';
import { TileFace } from './TileFace';

export default {
  component: TileFace,
  title: 'TileFace',
};

const Back = () => <TileFace concealed />;
const East = () => <TileFace concealed={false} />;

export {
  Back,
  East,
};
