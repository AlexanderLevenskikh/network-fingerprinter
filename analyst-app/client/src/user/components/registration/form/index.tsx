import React, { FC } from 'react';
import { Button, Form, Icon, Input, Tooltip } from 'antd';
import { useUserRegistrationForm } from 'root/user/components/registration/form/hook';
import { FormComponentProps } from 'antd/es/form';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

interface IProps {
}

export const UserRegistrationForm: FC<IProps & FormComponentProps> = ({ form }) => {
    const { t, loading, close, register } = useUserRegistrationForm();
    const { getFieldDecorator } = form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                register(values);
            }
        });
    };

    return (
        <Form { ...formItemLayout } onSubmit={ handleSubmit }>
            <Form.Item label={ t(I18UserNsKeys.userLoginLabel) }>
                { getFieldDecorator('userName', {
                    rules: [{ required: true, message: t(I18UserNsKeys.requiredField), whitespace: true }],
                })(<Input/>) }
            </Form.Item>
            <Form.Item label={ t(I18UserNsKeys.userPasswordLabel) } hasFeedback>
                { getFieldDecorator('password', {
                    rules: [{ required: true, message: t(I18UserNsKeys.requiredField) } ],
                })(<Input.Password/>) }
            </Form.Item>
            <Form.Item label={ t(I18UserNsKeys.firstUserNameLabel) }>
                { getFieldDecorator('firstName')(<Input/>) }
            </Form.Item>
            <Form.Item label={ t(I18UserNsKeys.lastUserNameLabel) }>
                { getFieldDecorator('lastName')(<Input/>) }
            </Form.Item>
            <Form.Item label={ t(I18UserNsKeys.middleUserNameLabel) }>
                { getFieldDecorator('middleName')(<Input/>) }
            </Form.Item>
            <Form.Item { ...tailFormItemLayout }>
                <Button type="primary" htmlType="submit" disabled={ loading }>
                    { t(I18UserNsKeys.registerButtonLabel) }
                </Button>
                &nbsp;
                <Button onClick={ close }>
                    { t(I18UserNsKeys.cancelButtonLabel) }
                </Button>
            </Form.Item>
        </Form>
    );
};

export const WrappedUserRegistrationForm = Form.create<IProps & FormComponentProps>({ name: 'register' })(UserRegistrationForm);

