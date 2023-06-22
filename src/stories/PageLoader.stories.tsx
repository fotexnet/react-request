import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component from '../components/PageLoader';
import { SpinnerProps } from '../components/Spinner';

const config: Meta<typeof Component> = {
  title: 'PageLoader',
  component: Component,
};

export default config;

const PageLoaderStory: StoryFn<SpinnerProps> = args => (
  <>
    <Component {...args} />
    <div style={{ width: '100%', height: '100vh', background: 'rgba(249, 113, 133, 1)' }}></div>
  </>
);

export const UniColor = PageLoaderStory.bind({});
UniColor.args = {
  color: 'steelblue',
};

export const TriColor = PageLoaderStory.bind({});
TriColor.args = {
  color: ['steelblue', 'lightcoral', 'lightgreen'],
};
