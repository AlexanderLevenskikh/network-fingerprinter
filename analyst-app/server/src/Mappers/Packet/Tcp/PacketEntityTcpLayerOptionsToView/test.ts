import { mapPacketEntityTcpLayerOptionsToView } from './index';
import { PacketViewTcpOptionType } from '../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';

describe('mapPacketEntityTcpLayerOptionsToView', () => {
    it('specificed options', () => {
        const optionsBytes = '02:04:05:b4:04:02:08:0a:cd:2d:32:b2:00:00:00:00:01:03:03:07';
        const options = mapPacketEntityTcpLayerOptionsToView(optionsBytes);

        expect(options).toEqual([
            { type: PacketViewTcpOptionType.mss },
            { type: PacketViewTcpOptionType.sok },
            { type: PacketViewTcpOptionType.ts },
            { type: PacketViewTcpOptionType.nop },
            { type: PacketViewTcpOptionType.ws },
        ])
    });

    it('with eol', () => {
        const optionsBytes = '02:04:05:b4:00:00:00:00';
        const options = mapPacketEntityTcpLayerOptionsToView(optionsBytes);

        expect(options).toEqual([
            { type: PacketViewTcpOptionType.mss },
            { type: PacketViewTcpOptionType.eol, payload: 3 },
        ])
    });

    it('empty', () => {
        const optionsBytes = '';
        const options = mapPacketEntityTcpLayerOptionsToView(optionsBytes);

        expect(options).toEqual([])
    });
});
