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
import { useTcpStreamsFilterForm } from 'root/streams/components/list/tcp/filter/form/hook';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { TcpStreamsFilterFormSensorId } from 'root/streams/components/list/tcp/filter/form/controls/sensorId';

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
    const { t } = useTcpStreamsFilterForm();

    return (
        <Form { ...formItemLayout } className={ styles.form }>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterSourceIp) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourceIp/>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterDestinationIp) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDestinationIp />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 } >
                    <Form.Item label={ t(I18StreamsNsKeys.filterSourcePort) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourcePort />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterDestinationPort) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDestinationPort />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterSourceMac) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSourceMac />
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterDestinationMac) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDestinationMac />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label={ t(I18StreamsNsKeys.filterDateRange) } labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormDateTimeFrom />
                        &nbsp;—&nbsp;
                        <TcpStreamsFilterFormDateTimeTo />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={ 20 } type='flex' justify='start'>
                <Col span={ 10 }>
                    <Form.Item label='Sensor ID' labelAlign='left' className={ styles.item }>
                        <TcpStreamsFilterFormSensorId />
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

