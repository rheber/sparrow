import React from 'react';
import { TileFace, Props } from './TileFace';

export default {
  component: TileFace,
  title: 'TileFace',
};

const Template = (args: Props) => <TileFace {...args} />;

const Default = Template.bind({});
Default.args = {
  concealed: false,
};

export {
  Default,
};
