import React, { FC } from 'react';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { Button, Col, Form, Input, Row } from 'antd';
import { TcpStreamsFilterFormFooter } from 'root/streams/components/list/tcp/filter/form/footer';
import { TcpStreamsFilterFormSourceIp } from 'root/streams/components/list/tcp/filter/form/controls/sourceIp';
import { TcpStreamsFilterFormDestinationIp } from 'root/streams/components/list/tcp/filter/form/controls/destinationIp';
import { TcpStreamsFilterFormSourceMac } from 'root/streams/components/list/tcp/filter/form/controls/sourceMac';
import { TcpStreamsFilterFormDestinationMac } from 'root/streams/components/list/tcp/filter/form/controls/destinationMac';
import { TcpStreamsFilterFormSourcePort } from 'root/streams/components/list/tcp/filter/form/controls/sourcePort';
import { TcpStreamsFilterFormDestinationPort } from 'root/streams/components/list/tcp/filter/form/controls/destinationPort';
import { TcpStreamsFilterFormDateTimeFrom } from 'root/streams/components/list/tcp/filter/form/controls/dateTimeFrom';
import { TcpStreamsFilterFormDateTimeTo } from 'root/streams/components/list/tcp/filter/form/controls/dateTimeTo';

interface IProps {
}

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

export const TcpStreamsFilterForm: FC<IProps> = () => {
    return (
        <Form { ...formItemLayout } className={ styles.form }>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='IP-адрес источника' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourceIp/>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label='IP-адрес назначения' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDestinationIp />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 } >
                    <Form.Item label='Порт источника' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourcePort />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label='Порт назначения' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDestinationPort />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='MAC-адрес источника' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourceMac />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='Дата' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDateTimeFrom />
                        &nbsp;—&nbsp;
                        <TcpStreamsFilterFormDateTimeTo />
                    </Form.Item>
                </Col>
            </Row>
            <Row className={ styles.search }>
                <Col span={ 10 }>
                    <TcpStreamsFilterFormFooter />
                </Col>
            </Row>
        </Form>
    );
};

