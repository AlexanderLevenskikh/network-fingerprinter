import React, { FC } from 'react';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import { I18MainNsKeys } from 'root/i18n/resources/main/keys';
import SubMenu from 'antd/es/menu/SubMenu';
import { useHeaderUserMenu } from 'root/shared/components/HeaderUserMenu/hook';

interface IProps {
}

enum MenuItemKey {
    User = 'User',
    Logout = 'Logout',
}

export const HeaderUserMenu: FC<IProps> = () => {
    const { name, t, onClickLogout } = useHeaderUserMenu();

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
        >
            <SubMenu
                key={ MenuItemKey.User }
                title={
                    <>
                        <Icon type="user" />
                        <span>
                            { name }
                        </span>
                    </>
                }
            >
                <Menu.Item
                    key={ MenuItemKey.Logout }
                    onClick={ onClickLogout }
                >
                    <span>
                        { t(I18MainNsKeys.menuUserLogoutLabel) }
                    </span>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};
