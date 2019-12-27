export interface IPacketViewTlsLayer {
    version: number;
    cipherSuites: number[];
    extensions: number[];
    supportedEllipticGroups: number[];
    ellipticPointFormats: number[];
}
