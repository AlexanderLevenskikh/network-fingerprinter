import { ISourceFingerprintsView } from './ISourceFingerprintsView';
import { IDestinationFingerprintsView } from './IDestinationFingerprintsView';

export interface IFingerprintViewTcp {
    source: ISourceFingerprintsView;
    destination: IDestinationFingerprintsView;
}
