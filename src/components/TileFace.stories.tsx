import React from 'react';
import { TileFace, Props } from './TileFace';
import { Story } from '@storybook/react/types-6-0';

export default {
  component: TileFace,
  title: 'TileFace',
};

const Template: Story<Props> = args => <TileFace {...args} />;

const Default = Template.bind({});
Default.args = {
  concealed: false,
};

export {
  Default,
};
