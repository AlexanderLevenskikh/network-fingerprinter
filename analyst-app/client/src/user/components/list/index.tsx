import React, { FC } from 'react';
import { Button, Icon, List, Modal, Tag } from 'antd';
import { useUsersList } from 'root/user/components/list/hook';
import { IUserView } from 'DAL/User/IUserView';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

interface IProps {
}

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
                    <List.Item actions={ item.userId !== currentUser.userId ? [
                        <Button
                            onClick={ () => remove(item.userId) }
                            type='link'
                        >{ t(I18UserNsKeys.usersListRemoveLabel) }</Button>
                    ] : [] }>
                        <List.Item.Meta
                            avatar={ <Icon type='user'/> }
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
                    </List.Item>
                ) }
            />,
        </Modal>
    );
};
