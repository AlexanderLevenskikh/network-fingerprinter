import React, { FC } from 'react';
import styles from '../styles.less';
import cn from 'classnames';

interface IProps {
    isActive: boolean;
    onClick(ev: any): void;
}

export const RussianFlag: FC<IProps> = ({ isActive, onClick }) => {
    const classes = cn({
        [ styles.flag ]: true,
        [ styles.active ]: isActive,
    });

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 640 480'
            className={ classes }
            onClick={ onClick }
        >
            <g fillRule='evenodd' strokeWidth='1pt'>
                <path fill='#fff' d='M0 0h640v480H0z'/>
                <path fill='#0039a6' d='M0 160h640v320H0z'/>
                <path fill='#d52b1e' d='M0 320h640v160H0z'/>
            </g>
        </svg>
    );
};
