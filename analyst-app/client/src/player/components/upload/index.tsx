import React, { FC, useState } from 'react';
import { Button, Icon, message, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { ShowUploadListInterface, UploadFile } from 'antd/es/upload/interface';
import Dragger from 'antd/es/upload/Dragger';
import { useTranslation } from 'react-i18next';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import styles from './styles.less';

interface IProps {
}

export const PlayerUpload: FC<IProps> = () => {
    const [ loading, setLoading ] = useState(false);
    const { t } = useTranslation(I18nNamespace.player);

    const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
        let fileList = [...info.fileList];

        const areAllFilesUploaded = fileList.every(file => file.status === 'done');

        if (areAllFilesUploaded) {
            message.success(t(I18PlayerNsKeys.succeedUploadMessage));
            setLoading(false);
        } else if (!loading) {
            setLoading(true);
        }
    };

    const showUploadList: ShowUploadListInterface = {
        showDownloadIcon: false,
        showPreviewIcon: false,
        showRemoveIcon: false,
    };

    return (
        <Dragger
            disabled={ loading }
            multiple
            onChange={ onChange }
            action='/api/player/upload'
            height={ 250 }
            showUploadList={ showUploadList }
        >
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">{ t(I18PlayerNsKeys.draggerTitle) }</p>
            <p className="ant-upload-hint">
                { t(I18PlayerNsKeys.draggerMessage) }
            </p>
        </Dragger>
    );
};
