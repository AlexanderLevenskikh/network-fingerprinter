import { httpFirefoxPacketStub } from './__test__/firefox';
import { httpFingerprintProcessor, HttpFingerprintProcessorPacketType } from './Http';
import { HttpFingerprintClass } from './Fingerprint/HttpFingerprintClass';
import { HttpFingerprintType } from './Fingerprint/HttpFingerprintType';

describe('httpFingerprintProcessor', () => {
    it('firefox 2.x request', () => {
        const result = httpFingerprintProcessor(
            httpFirefoxPacketStub,
            HttpFingerprintProcessorPacketType.Request,
        );

        expect(Boolean(result)).toBeTruthy();
        expect(result.class).toEqual(HttpFingerprintClass.Other);
        expect(result.type).toEqual(HttpFingerprintType.Specific);
        expect(result.flavour).toEqual('2.x');
        expect(result.name).toEqual('Firefox');
    });
});
