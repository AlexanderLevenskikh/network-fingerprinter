import React, { FC } from 'react';
import { Text } from 'root/shared/components/CompatibleAntd';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { Tag } from 'antd';
import { Paragraph } from 'root/shared/components/CompatibleAntd';

interface IProps {
    label: string;
}

export const StreamsFingerprintIsUndefined: FC<IProps> = ({ label }) => {
    const { t } = useTranslation(I18nNamespace.streams);

    return (
        <Paragraph>
            <Text strong>{ label }</Text>
            :&nbsp;&nbsp;
            <Tag color='red'>
                { t(I18StreamsNsKeys.listFingerprintColumnUndefined) }
            </Tag>
        </Paragraph>
    )
};