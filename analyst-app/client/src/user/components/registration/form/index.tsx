import React, { FC } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useUserRegistrationForm } from 'root/user/components/registration/form/hook';
import { IUserRegistrationModel } from 'root/user/model/registration';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

export const UserRegistrationForm: FC = () => {
    const { t, loading, close, register } = useUserRegistrationForm();
    const [ form ] = Form.useForm();
    const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 8 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
    };
    const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
    };

    return (
        <Form
            form={ form }
            { ...formItemLayout }
            initialValues={{ isAdmin: false }}
            onFinish={ (values: IUserRegistrationModel) => register(values) }
        >
            <Form.Item name="userName" label={ t(I18UserNsKeys.userLoginLabel) }
                rules={[{ required: true, message: t(I18UserNsKeys.requiredField), whitespace: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label={ t(I18UserNsKeys.userPasswordLabel) } hasFeedback
                rules={[{ required: true, message: t(I18UserNsKeys.requiredField) }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="firstName" label={ t(I18UserNsKeys.firstUserNameLabel) }>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label={ t(I18UserNsKeys.lastUserNameLabel) }>
                <Input />
            </Form.Item>
            <Form.Item name="middleName" label={ t(I18UserNsKeys.middleUserNameLabel) }>
                <Input />
            </Form.Item>
            <Form.Item name="isAdmin" valuePropName="checked" label={ t(I18UserNsKeys.isUserAdminLabel) }>
                <Checkbox />
            </Form.Item>
            <Form.Item { ...tailFormItemLayout }>
                <Button type="primary" htmlType="submit" disabled={ loading }>
                    { t(I18UserNsKeys.registerButtonLabel) }
                </Button>
                &nbsp;
                <Button onClick={ close }>{ t(I18UserNsKeys.cancelButtonLabel) }</Button>
            </Form.Item>
        </Form>
    );
};

// Keep the original exported component name used by the registration modal.
export const WrappedUserRegistrationForm = UserRegistrationForm;