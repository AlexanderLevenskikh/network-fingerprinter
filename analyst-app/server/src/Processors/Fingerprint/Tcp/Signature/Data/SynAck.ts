import { mapP0fTcpSignatures } from '../../p0f/mapP0fTcpSignatures';
import { synAckP0fSignatures } from '../../p0f/SynAck';

export const synAckSignatures = mapP0fTcpSignatures(synAckP0fSignatures);
