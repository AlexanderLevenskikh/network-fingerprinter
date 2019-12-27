import { IMap } from '../../../../Shared/Types/IMap';

export const synAckP0fSignatures: IMap<string[]> = {
    // Linux
    's:unix:Linux:3.x': [
        '*:64:0:*:mss*10,0:mss:df:0',
        '*:64:0:*:mss*10,0:mss,sok,ts:df:0',
        '*:64:0:*:mss*10,0:mss,nop,nop,ts:df:0',
        '*:64:0:*:mss*10,0:mss,nop,nop,sok:df:0',
        '*:64:0:*:mss*10,*:mss,nop,ws:df:0',
        '*:64:0:*:mss*10,*:mss,sok,ts,nop,ws:df:0',
        '*:64:0:*:mss*10,*:mss,nop,nop,ts,nop,ws:df:0',
        '*:64:0:*:mss*10,*:mss,nop,nop,ts,nop,ws:df:0',
        '*:64:0:*:mss*10,*:mss,nop,nop,sok,nop,ws:df:0',
    ],
    's:unix:Linux:2.4-2.6': [
        '*:64:0:*:mss*4,0:mss:df:0',
        '*:64:0:*:mss*4,0:mss,sok,ts:df:0',
        '*:64:0:*:mss*4,0:mss,nop,nop,ts:df:0',
        '*:64:0:*:mss*4,0:mss,nop,nop,sok:df:0',
    ],
    's:unix:Linux:2.4.x': [
        '*:64:0:*:mss*4,0:mss,nop,ws:df:0',
        '*:64:0:*:mss*4,0:mss,sok,ts,nop,ws:df:0',
        '*:64:0:*:mss*4,0:mss,nop,nop,ts,nop,ws:df:0',
        '*:64:0:*:mss*4,0:mss,nop,nop,sok,nop,ws:df:0',
    ],
    'g:unix:Linux:2.6.x': [
        '*:64:0:*:mss*4,*:mss,nop,ws:df:0',
        '*:64:0:*:mss*4,*:mss,sok,ts,nop,ws:df:0',
        '*:64:0:*:mss*4,*:mss,nop,nop,ts,nop,ws:df:0',
        '*:64:0:*:mss*4,*:mss,nop,nop,sok,nop,ws:df:0',
    ],

    // Windows
    's:win:Windows:XP': [
        '*:128:0:*:65535,0:mss:df,id+:0',
        '*:128:0:*:65535,0:mss,nop,ws:df,id+:0',
        '*:128:0:*:65535,0:mss,nop,nop,sok:df,id+:0\n',
        '*:128:0:*:65535,0:mss,nop,nop,ts:df,id+,ts1-:0',
        '*:128:0:*:65535,0:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,0:mss,nop,ws,nop,nop,ts:df,id+,ts1-:0',
        '*:128:0:*:65535,0:mss,nop,nop,ts,nop,nop,sok:df,id+,ts1-:0',
        '*:128:0:*:65535,0:mss,nop,ws,nop,nop,ts,nop,nop,sok:df,id+,ts1-:0',
        '*:128:0:*:16384,0:mss:df,id+:0',
        '*:128:0:*:16384,0:mss,nop,ws:df,id+:0',
        '*:128:0:*:16384,0:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:16384,0:mss,nop,nop,ts:df,id+,ts1-:0',
        '*:128:0:*:16384,0:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:16384,0:mss,nop,ws,nop,nop,ts:df,id+,ts1-:0',
        '*:128:0:*:16384,0:mss,nop,nop,ts,nop,nop,sok:df,id+,ts1-:0',
        '*:128:0:*:16384,0:mss,nop,ws,nop,nop,ts,nop,nop,sok:df,id+,ts1-:0',
    ],
    's:win:Windows:7 or 8': [
        '*:128:0:*:8192,0:mss:df,id+:0',
        '*:128:0:*:8192,0:mss,sok,ts:df,id+:0',
        '*:128:0:*:8192,8:mss,nop,ws:df,id+:0',
        '*:128:0:*:8192,0:mss,nop,nop,ts:df,id+:0',
        '*:128:0:*:8192,0:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:8192,8:mss,nop,ws,nop,nop,ts:df,id+:0',
        '*:128:0:*:8192,8:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],

    // Mac OS
    's:unix:Mac OS X:10.x': [
        '*:64:0:*:65535,0:mss,nop,ws:df,id+:0',
        '*:64:0:*:65535,0:mss,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,nop,ts:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,ws,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,ws,nop,nop,ts:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,nop,ts,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
    ],

    // FreeBSD
    's:unix:FreeBSD:9.x': [
        '*:64:0:*:65535,6:mss,nop,ws:df,id+:0',
        '*:64:0:*:65535,6:mss,nop,ws,sok,ts:df,id+:0',
        '*:64:0:*:65535,6:mss,nop,ws,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,6:mss,nop,ws,nop,nop,ts:df,id+:0',
    ],
    's:unix:FreeBSD:8.x': [
        '*:64:0:*:65535,3:mss,nop,ws,sok,ts:df,id+:0',
        '*:64:0:*:65535,3:mss,nop,ws:df,id+:0',
        '*:64:0:*:65535,3:mss,nop,ws,sok,ts:df,id+:0',
        '*:64:0:*:65535,3:mss,nop,ws,sok,eol+1:df,id+:0',
    ],
    's:unix:FreeBSD:8.x-9.x': [
        '*:64:0:*:65535,0:mss,sok,ts:df,id+:0',
        '*:64:0:*:65535,0:mss,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,0:mss,nop,nop,ts:df,id+:0',
    ],

    // OpenBSD
    's:unix:OpenBSD:5.x': [
        '*:64:0:1460:16384,0:mss,nop,nop,sok:df,id+:0',
        '*:64:0:1460:16384,3:mss,nop,ws:df,id+:0',
        '*:64:0:1460:16384,3:mss,nop,nop,sok,nop,ws:df,id+:0',
        '*:64:0:1460:16384,0:mss,nop,nop,ts:df,id+:0',
        '*:64:0:1460:16384,0:mss,nop,nop,sok,nop,nop,ts:df,id+:0',
        '*:64:0:1460:16384,3:mss,nop,ws,nop,nop,ts:df,id+:0',
        '*:64:0:1460:16384,3:mss,nop,nop,sok,nop,ws,nop,nop,ts:df,id+:0',
        '*:64:0:1460:16384,0:mss:df,id+:0',
    ],

    // HP-UX
    's:unix:HP-UX:11.x': [
        '*:64:0:*:32768,0:mss:df,id+:0',
        '*:64:0:*:32768,0:mss,ws,nop:df,id+:0',
        '*:64:0:*:32768,0:mss,nop,nop,ts:df,id+:0',
        '*:64:0:*:32768,0:mss,nop,nop,sok:df,id+:0',
        '*:64:0:*:32768,0:mss,ws,nop,nop,nop,ts:df,id+:0',
        '*:64:0:*:32768,0:mss,nop,nop,sok,ws,nop:df,id+:0',
        '*:64:0:*:32768,0:mss,nop,nop,sok,nop,nop,ts:df,id+:0',
        '*:64:0:*:32768,0:mss,nop,nop,sok,ws,nop,nop,nop,ts:df,id+:0',
    ],

    // OpenVMS
    's:other:OpenVMS:7.x': [
        '4:64:0:1460:3993,0:mss::0',
        '4:64:0:1460:3993,0:mss,nop,ws::0',
    ],

    // Tru64
    's:unix:Tru64:4.x': [
        '4:64:0:1460:mss*25,0:mss,nop,ws:df,id+:0',
        '4:64:0:1460:mss*25,0:mss:df,id+:0',
    ],
};
