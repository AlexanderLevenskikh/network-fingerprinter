import React, { FC, useState } from 'react';
import { Icon } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/es/upload/interface';
import Dragger from 'antd/es/upload/Dragger';
import { useTranslation } from 'react-i18next';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import styles from './styles.less';

interface ImportResult {
    status: 'indexed' | 'no_matches';
    indexedPackets: number;
}

export const PlayerUpload: FC = () => {
    const [ files, setFiles ] = useState<UploadFile[]>([]);
    const { t } = useTranslation(I18nNamespace.player);

    const onChange = (info: UploadChangeParam<UploadFile<ImportResult>>) => {
        // Ant Upload tracks every file separately. Keeping 'error' in the list
        // must not disable the dropzone or prevent a fresh selection.
        setFiles([ ...info.fileList ]);
    };

    const label = (file: UploadFile<ImportResult>) => {
        if (file.status === 'uploading') return t(I18PlayerNsKeys.processing);
        if (file.status === 'error') {
            const response: any = file.response;
            const reason = response && response.message
                ? (Array.isArray(response.message) ? response.message.join(', ') : response.message)
                : 'HTTP / network error';
            return t(I18PlayerNsKeys.failed, { reason });
        }
        if (file.status === 'done') {
            const result = file.response;
            if (result && result.status === 'indexed' && typeof result.indexedPackets === 'number') {
                return t(I18PlayerNsKeys.indexed, { count: result.indexedPackets });
            }
            if (result && result.status === 'no_matches' && result.indexedPackets === 0) {
                return t(I18PlayerNsKeys.noMatches);
            }
            return t(I18PlayerNsKeys.failed, { reason: 'Unexpected server response' });
        }
        return t(I18PlayerNsKeys.processing);
    };

    return (
        <div>
            <Dragger
                multiple
                fileList={ files }
                onChange={ onChange }
                action="/api/player/upload"
                height={ 250 }
                showUploadList={ false }
            >
                <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                <p className="ant-upload-text">{ t(I18PlayerNsKeys.draggerTitle) }</p>
                <p className="ant-upload-hint">{ t(I18PlayerNsKeys.draggerMessage) }</p>
            </Dragger>
            <ul aria-label="PCAP import results" className={ styles.results }>
                { files.map(file => (
                    <li key={ file.uid }>
                        <strong>{ file.name }</strong>: <span>{ label(file) }</span>
                    </li>
                )) }
            </ul>
        </div>
    );
};
