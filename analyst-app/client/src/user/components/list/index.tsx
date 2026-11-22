import React, { FC } from 'react';
import { Button, List, Modal, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useUsersList } from 'root/user/components/list/hook';
import { IUserView } from 'DAL/User/IUserView';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

interface IProps {
}

// JSX wrappers for Ant Design 4's forward-ref components under the legacy TS toolchain.
const UserListItem = List.Item as React.ComponentType<{ actions?: React.ReactNode[]; children?: React.ReactNode }>;
const UserListItemMeta = List.Item.Meta as React.ComponentType<{ avatar?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode }>;

export const UsersList: FC<IProps> = () => {
    const { loading, modalOpened, list, t, remove, close, currentUser } = useUsersList();

    if (!modalOpened) {
        return null;
    }

    const getName = ({ userName, middleName, firstName, lastName }: IUserView) =>
        ((lastName || '') + (firstName ? ` ${ firstName }` : '') + (middleName ? ` ${ middleName }` : '')) || userName;

    return (
        <Modal
            visible={ modalOpened }
            footer={ null }
            onCancel={ close }
        >
            <List
                itemLayout="horizontal"
                dataSource={ list }
                renderItem={ item => (
                    <UserListItem actions={ item.userId !== currentUser.userId ? [
                        <Button
                            onClick={ () => remove(item.userId) }
                            type='link'
                        >{ t(I18UserNsKeys.usersListRemoveLabel) }</Button>
                    ] : [] }>
                        <UserListItemMeta
                            avatar={ <UserOutlined /> }
                            title={ <span>{ t(I18UserNsKeys.usersListLoginLabel) }: { item.userName }</span> }
                            description={ (<div>
                                { getName(item) }
                                &nbsp;
                                { item.isAdmin && (
                                    <Tag color='green'>
                                        { t(I18UserNsKeys.usersListAdminLabel) }
                                    </Tag>
                                ) }
                            </div>) }

                        />
                    </UserListItem>
                ) }
            />,
        </Modal>
    );
};