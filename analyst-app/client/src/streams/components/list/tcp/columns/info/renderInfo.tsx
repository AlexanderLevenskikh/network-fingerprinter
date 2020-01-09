import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TFunction } from 'i18next';
import styles from './styles.less';
import Text from 'antd/es/typography/Text';
import React from 'react';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { EnumMap } from 'root/shared/types/enumMap';
import { PacketViewTcpApplicationProtocol } from 'DAL/Packet/Tcp/PacketViewTcpApplicationProtocol';
import { Tag, Tooltip } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

const protoToColorMap: EnumMap<PacketViewTcpApplicationProtocol, string> = {
    [PacketViewTcpApplicationProtocol.Ftp]: 'magenta',
    [PacketViewTcpApplicationProtocol.Http]: 'green',
    [PacketViewTcpApplicationProtocol.Tls]: 'blue',
    [PacketViewTcpApplicationProtocol.Smtp]: 'gold',
    [PacketViewTcpApplicationProtocol.Ssh]: 'volcano',
    [PacketViewTcpApplicationProtocol.Telnet]: 'geekblue',
    [PacketViewTcpApplicationProtocol.Unknown]: 'lime',
};

export function renderInfo(stream: ITcpStreamView, t: TFunction) {
    const { packetsCount, applicationLayerProtocols, serverNameIndication, sensorId } = stream;
    return (
        <ul className={ styles.list }>
            { sensorId && (
                <li>
                    <Paragraph copyable={{ text: sensorId }} className={ styles.text }>
                        <Text strong>Sensor ID</Text>
                        :&nbsp;
                        <Tooltip placement="topLeft" title={ sensorId }>
                            <Text code ellipsis className={ styles.ellipsis }>{ sensorId }</Text>
                        </Tooltip>
                    </Paragraph>
                </li>
            )}
            { serverNameIndication && (
                <li>
                    <Paragraph copyable={{ text: serverNameIndication }} className={ styles.text }>
                        <Text strong>{ t(I18StreamsNsKeys.listPacketsSniColumnSubTitle) }</Text>
                        :&nbsp;
                        <Tooltip placement="topLeft" title={ serverNameIndication }>
                            <Text code ellipsis className={ styles.ellipsis }>{ serverNameIndication }</Text>
                        </Tooltip>
                    </Paragraph>
                </li>
            )}
            { applicationLayerProtocols.length > 0 && (
                <li>
                    <Text strong>{ t(I18StreamsNsKeys.listPacketsApplicationLayerProtoColumnSubTitle) }</Text>
                    <br/>
                    <ul className={ styles.tags }>
                        { applicationLayerProtocols.map(proto => {
                            if (proto === PacketViewTcpApplicationProtocol.Unknown) {
                                return null;
                            }

                            return (
                                <li className={ styles.tag } key={ proto }>
                                    <Tag color={ protoToColorMap[proto] }>
                                        { proto }
                                    </Tag>
                                </li>
                            );
                        }) }
                    </ul>
                </li>
            ) }

        </ul>
    )
}
