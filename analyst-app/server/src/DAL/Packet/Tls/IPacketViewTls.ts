export interface IPacketViewTls {
    version: number;
    cipherSuites: number[];
    extensions: number[];
    supportedEllipticGroups: number[];
    ellipticPointFormats: number[];
}
