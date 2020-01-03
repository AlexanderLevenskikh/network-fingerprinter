import React, { AllHTMLAttributes, FC } from 'react';
import { NavLink, NavLinkProps } from 'redux-first-router-link';
import styles from './styles.less';

export type RouterLinkProps = NavLinkProps & AllHTMLAttributes<HTMLElement>;

export const RouterLink: FC<RouterLinkProps> = props => {
    const { children, ...rest } = props;
    const navLinkProps: NavLinkProps = {
        ...rest,
        className: styles.link,
    };

    return (
        <NavLink { ...navLinkProps }>
            { children }
        </NavLink>
    );
};
RouterLink.displayName = 'RouterLink';
