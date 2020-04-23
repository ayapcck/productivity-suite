import React from 'react';

import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import { colorTheme } from '../app/colors';

addDecorator(storyFn => <ThemeProvider theme={colorTheme}>{storyFn()}</ThemeProvider>);