import React from 'react';
import BaseText from 'antd/es/typography/Text';
import BaseParagraph from 'antd/es/typography/Paragraph';
import BaseDrawer from 'antd/es/drawer';

// Ant Design 4 supports these public props, but its forward-ref declarations
// are incompletely understood by the retained TypeScript 3.7 compiler.
// This narrow bridge retains compile-time validation of the props we use.
interface TypographyProps {
    children?: React.ReactNode;
    code?: boolean;
    strong?: boolean;
    ellipsis?: boolean;
    className?: string;
    copyable?: boolean | { text: string };
}
interface DrawerProps {
    children?: React.ReactNode;
    width?: number | string;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    onClose?: () => void;
    visible?: boolean;
}
export const Text = BaseText as unknown as React.ComponentType<TypographyProps>;
export const Paragraph = BaseParagraph as unknown as React.ComponentType<TypographyProps>;
export const Drawer = BaseDrawer as unknown as React.ComponentType<DrawerProps>;