import React, { FC } from 'react';
import { useUserRegistration } from 'root/user/components/registration/hook';
import { Modal } from 'antd';
import { WrappedUserRegistrationForm } from 'root/user/components/registration/form';

interface IProps {
}

export const UserRegistration: FC<IProps> = () => {
    const { registrationModalOpened } = useUserRegistration();

    if (!registrationModalOpened) {
        return null;
    }

    return (
        <Modal
            visible={ registrationModalOpened }
            footer={ null }
            closable={ false }
        >
            <WrappedUserRegistrationForm />
        </Modal>
    );
};
