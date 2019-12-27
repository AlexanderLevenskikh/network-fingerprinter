import { IMap } from '../../../../Shared/Types/IMap';

export const synP0fSignatures: IMap<string[]> = {
    // Linux
    's:unix:Linux:3.11 and newer': [
        '*:64:0:*:mss*20,10:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*20,7:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:3.1-3.10': [
        '*:64:0:*:mss*10,4:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*10,5:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*10,6:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*10,7:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.6.x': [
        '*:64:0:*:mss*4,6:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*4,7:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*4,8:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.4.x': [
        '*:64:0:*:mss*4,0:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*4,1:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*4,2:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.2.x': [
        '*:64:0:*:mss*11,0:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*20,0:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*22,0:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.0': [
        '*:64:0:*:mss*12,0:mss::0',
        '*:64:0:*:16384,0:mss::0',
    ],

    // Just to keep people testing locally happy (IPv4 & IPv6)
    's:unix:Linux:3.x (loopback)': [
        '*:64:0:16396:mss*2,4:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:16376:mss*2,4:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.6.x (loopback)': [
        '*:64:0:16396:mss*2,2:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:16376:mss*2,2:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.4.x (loopback)': [
        '*:64:0:16396:mss*2,0:mss,sok,ts,nop,ws:df,id+:0',
    ],
    's:unix:Linux:2.2.x (loopback)': [
        '*:64:0:3884:mss*8,0:mss,sok,ts,nop,ws:df,id+:0',
    ],

    // Various distinctive flavors of Linux
    's:unix:Linux:2.6.x (Google crawler)': [
        '4:64:0:1430:mss*4,6:mss,sok,ts,nop,ws::0',
    ],
    's:unix:Linux:(Android)': [
        '*:64:0:*:mss*44,1:mss,sok,ts,nop,ws:df,id+:0',
        '*:64:0:*:mss*44,3:mss,sok,ts,nop,ws:df,id+:0',
    ],

    // Catch-all rules:
    'g:unix:Linux:3.x': [
        '*:64:0:*:mss*10,*:mss,sok,ts,nop,ws:df,id+:0',
    ],
    'g:unix:Linux:2.4.x-2.6.x': [
        '*:64:0:*:mss*4,*:mss,sok,ts,nop,ws:df,id+:0',
    ],
    'g:unix:Linux:2.2.x-3.x': [
        '*:64:0:*:*,*:mss,sok,ts,nop,ws:df,id+:0',
    ],
    'g:unix:Linux:2.2.x-3.x (no timestamps)': [
        '*:64:0:*:*,*:mss,nop,nop,sok,nop,ws:df,id+:0',
    ],
    'g:unix:Linux:2.2.x-3.x (barebone)': [
        '*:64:0:*:*,0:mss:df,id+:0',
    ],

    // Windows
    's:win:Windows:XP': [
        '*:128:0:*:16384,0:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,0:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,0:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,1:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,2:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],
    's:win:Windows:7 or 8': [
        '*:128:0:*:8192,0:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:8192,2:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:8192,8:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:8192,2:mss,nop,ws,sok,ts:df,id+:0',
    ],
    's:win:Windows:7 (Websense crawler)': [
        '*:64:0:1380:mss*4,6:mss,nop,nop,ts,nop,ws:df,id+:0',
        '*:64:0:1380:mss*4,7:mss,nop,nop,ts,nop,ws:df,id+:0',
    ],
    // Catch-all
    'g:win:Windows:NT kernel 5.x': [
        '*:128:0:*:16384,*:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,*:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:16384,*:mss,nop,ws,nop,nop,sok:df,id+:0',
        '*:128:0:*:65535,*:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],
    'g:win:Windows:NT kernel 6.x': [
        '*:128:0:*:8192,*:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:8192,*:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],
    'g:win:Windows:NT kernel': [
        '*:128:0:*:*,*:mss,nop,nop,sok:df,id+:0',
        '*:128:0:*:*,*:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],

    // Mac OS
    's:unix:Mac OS X:10.x': [
        '*:64:0:*:65535,1:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
        '*:64:0:*:65535,3:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
    ],
    's:unix:Mac OS X:10.9 or newer (sometimes iPhone or iPad)': [
        '*:64:0:*:65535,4:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
    ],
    's:unix:Mac OS X:iPhone or iPad': [
        '*:64:0:*:65535,2:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
    ],
    // Catch-all
    'g:unix:Mac OS X:': [
        '*:64:0:*:65535,*:mss,nop,ws,nop,nop,ts,sok,eol+1:df,id+:0',
    ],

    // FreeBSD
    's:unix:FreeBSD:9.x or newer': [
        '*:64:0:*:65535,6:mss,nop,ws,sok,ts:df,id+:0',
    ],
    's:unix:FreeBSD:8.x': [
        '*:64:0:*:65535,3:mss,nop,ws,sok,ts:df,id+:0',
    ],
    // Catch-all
    'g:unix:FreeBSD:': [
        '*:64:0:*:65535,*:mss,nop,ws,sok,ts:df,id+:0\n',
    ],

    // OpenBSD
    's:unix:OpenBSD:3.x': [
        '*:64:0:*:16384,0:mss,nop,nop,sok,nop,ws,nop,nop,ts:df,id+:0',
    ],
    's:unix:OpenBSD:4.x-5.x': [
        '*:64:0:*:16384,3:mss,nop,nop,sok,nop,ws,nop,nop,ts:df,id+:0',
    ],

    // Solaris
    's:unix:Solaris:8': [
        '*:64:0:*:32850,1:nop,ws,nop,nop,ts,nop,nop,sok,mss:df,id+:0',
    ],
    's:unix:Solaris:10': [
        '*:64:0:*:mss*34,0:mss,nop,ws,nop,nop,sok:df,id+:0',
    ],

    // OpenVMS
    's:unix:OpenVMS:8.x': [
        '4:128:0:1460:mtu*2,0:mss,nop,ws::0',
    ],
    's:unix:OpenVMS:7.x': [
        '4:64:0:1460:61440,0:mss,nop,ws::0',
    ],

    // NeXTSTEP
    's:other:NeXTSTEP:': [
        '4:64:0:1024:mss*4,0:mss::0',
    ],

    // Tru64
    's:unix:Tru64:4.x': [
        '4:64:0:1460:32768,0:mss,nop,ws:df,id+:0',
    ],

    // NMap
    's:!:NMap:SYN scan': [
        '*:64-:0:1460:1024,0:mss::0',
        '*:64-:0:1460:2048,0:mss::0',
        '*:64-:0:1460:3072,0:mss::0',
        '*:64-:0:1460:4096,0:mss::0',
    ],
    's:!:NMap:OS detection': [
        '*:64-:0:265:512,0:mss,sok,ts:ack+:0',
        '*:64-:0:0:4,10:sok,ts,ws,eol+0:ack+:0',
        '*:64-:0:1460:1,10:ws,nop,mss,ts,sok:ack+:0',
        '*:64-:0:536:16,10:mss,sok,ts,ws,eol+0:ack+:0',
        '*:64-:0:640:4,5:ts,nop,nop,ws,nop,mss:ack+:0',
        '*:64-:0:1400:63,0:mss,ws,sok,ts,eol+0:ack+:0',
        '*:64-:0:265:31337,10:ws,nop,mss,ts,sok:ack+:0',
        '*:64-:0:1460:3,10:ws,nop,mss,sok,nop,nop:ecn,uptr+:0\n',
    ],

    // p0f-sendsyn
    's:unix:p0f:sendsyn utility': [
        '*:192:0:1331:1337,0:mss,nop,eol+18::0',
        '*:192:0:1331:1337,0:mss,ts,nop,eol+8::0',
        '*:192:0:1331:1337,5:mss,ws,nop,eol+15::0',
        '*:192:0:1331:1337,0:mss,sok,nop,eol+16::0',
        '*:192:0:1331:1337,5:mss,ws,ts,nop,eol+5::0',
        '*:192:0:1331:1337,0:mss,sok,ts,nop,eol+6::0',
        '*:192:0:1331:1337,5:mss,ws,sok,nop,eol+13::0',
        '*:192:0:1331:1337,5:mss,ws,sok,ts,nop,eol+3::0\n',
    ],

    // Odds and ends
    's:other:Blackberry:': [
        '*:128:0:1452:65535,0:mss,nop,nop,sok,nop,nop,ts::0',
        ],
    's:other:Nintendo:3DS': [
        '*:64:0:1360:32768,0:mss,nop,nop,sok:df,id+:0\n',
    ],
    's:other:Nintendo:Wii': [
        '4:64:0:1460:32768,0:mss,nop,nop,sok:df,id+:0',
    ],
    's:unix:BaiduSpider:': [
        '*:64:0:1460:mss*4,7:mss,sok,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,ws:df,id+:0',
        '*:64:0:1460:mss*4,2:mss,sok,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,ws:df,id+:0',
    ],
};
