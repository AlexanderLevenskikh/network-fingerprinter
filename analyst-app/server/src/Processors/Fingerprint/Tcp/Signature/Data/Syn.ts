import { mapP0fTcpSignatures } from '../../p0f/mapP0fTcpSignatures';
import { synP0fSignatures } from '../../p0f/Syn';

export const synSignatures = mapP0fTcpSignatures(synP0fSignatures);
