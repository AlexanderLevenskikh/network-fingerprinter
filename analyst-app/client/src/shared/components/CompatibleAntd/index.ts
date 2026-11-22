import React from 'react';
import BaseText from 'antd/es/typography/Text';
import BaseParagraph from 'antd/es/typography/Paragraph';
import { Drawer as BaseDrawer } from 'antd';

// Ant Design 4 forward-ref declarations with the retained legacy TS3.7 JSX
// inference require explicit children; preserve the library's real prop types.
export const Text = BaseText as React.ComponentType<React.ComponentProps<typeof BaseText> & { children?: React.ReactNode }>;
export const Paragraph = BaseParagraph as React.ComponentType<React.ComponentProps<typeof BaseParagraph> & { children?: React.ReactNode }>;
export const Drawer = BaseDrawer as React.ComponentType<React.ComponentProps<typeof BaseDrawer> & { children?: React.ReactNode }>;