import React, { FC } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import styles from './styles.less';

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

export const TcpStreamsSearchForm: FC = () => {
    return (
        <Form { ...formItemLayout } className={ styles.wrapper }>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='IP-адрес источника' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label='IP-адрес назначения' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='MAC-адрес источника' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label='MAC-адрес назначения' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 } >
                    <Form.Item label='Порт источника' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label='Порт назначения' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='Дата и время' labelAlign='left' className={ styles.item }>
                        <Input
                            className={ styles.input }
                        />
                        &nbsp;-&nbsp;
                        <Input
                            className={ styles.input }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className={ styles.search }>
                <Col span={ 10 }>
                    <Button type='primary' htmlType='submit' icon='search'>
                        Поиск
                    </Button>
                    <Button style={{ marginLeft: 8 }} >
                        Отмена
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
