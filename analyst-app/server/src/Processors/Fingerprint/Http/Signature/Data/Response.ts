import { mapP0fHttpSignatures } from '../../p0f/mapP0fHttpSignatures';
import { httpResponseP0fSignatures } from '../../p0f/Response';

export const httpResponseSignatures = mapP0fHttpSignatures(httpResponseP0fSignatures);
