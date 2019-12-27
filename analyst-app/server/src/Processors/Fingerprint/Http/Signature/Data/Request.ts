import { mapP0fHttpSignatures } from '../../p0f/mapP0fHttpSignatures';
import { httpRequestP0fSignatures } from '../../p0f/Request';

export const httpRequestSignatures = mapP0fHttpSignatures(httpRequestP0fSignatures);
