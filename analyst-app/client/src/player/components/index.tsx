import React, { FC } from 'react';
import { PlayerUpload } from 'root/player/components/upload';

interface IProps {
}

export const PlayerPage: FC<IProps> = () => {
    return (
        <>
            <PlayerUpload />
        </>
    );
};
