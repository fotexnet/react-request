import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { SpinnerProps } from '../components/Spinner';

const config: Meta<typeof Component> = {
  title: 'Spinner',
  component: Component,
};

export default config;

const SpinnerStory: StoryFn<SpinnerProps> = args => <Component {...args} />;

export const Spinner = SpinnerStory.bind({});
Spinner.args = {
  color: 'lightcoral',
};
