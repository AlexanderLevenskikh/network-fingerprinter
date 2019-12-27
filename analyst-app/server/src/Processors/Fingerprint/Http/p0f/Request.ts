import { IMap } from '../../../../Shared/Types/IMap';

export const httpRequestP0fSignatures: IMap<string[]> = {
    // Firefox
    's:!:Firefox:2.x': [
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip,deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],Keep-Alive=[300],Connection=[keep-alive]::Firefox/',
    ],
    's:!:Firefox:3.x': [
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip,deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],Keep-Alive=[115],Connection=[keep-alive],?Referer::Firefox/',
    ],
    's:!:Firefox:4.x': [
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],Keep-Alive=[115],Connection=[keep-alive],?Referer::Firefox/',
    ],
    's:!:Firefox:5.x-9.x': [
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],?DNT=[1],Connection=[keep-alive],?Referer:Keep-Alive:Firefox/',
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[UTF-8,*],?DNT=[1],Connection=[keep-alive],?Referer:Keep-Alive:Firefox/',
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[UTF-8,*],?DNT=[1],?Referer,Connection=[keep-alive]:Keep-Alive:Firefox/',
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],?DNT=[1],?Referer,Connection=[keep-alive]:Keep-Alive:Firefox/',
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language,Accept-Encoding=[gzip, deflate],Accept-Charset=[utf-8;q=0.7,*;q=0.7],?Referer,?DNT=[1],Connection=[keep-alive]:Keep-Alive:Firefox/',
    ],
    's:!:Firefox:10.x or newer': [
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language=[;q=],Accept-Encoding=[gzip, deflate],?DNT=[1],Connection=[keep-alive],?Referer:Accept-Charset,Keep-Alive:Firefox/',
        '*:Host,User-Agent,Accept=[,*/*;q=],?Accept-Language=[;q=],Accept-Encoding=[gzip, deflate],?DNT=[1],?Referer,Connection=[keep-alive]:Accept-Charset,Keep-Alive:Firefox/',
        '*:Accept=[,*/*;q=],Accept-Encoding=[gzip, deflate],Accept-Language=[;q=],?Cache-Control,Host,?Pragma,User-Agent,Connection=[keep-alive]:Accept-Charset,Keep-Alive:Firefox/',
    ],
    's:!:Firefox:10.x or Safari 5.x': [
        '*:Host,User-Agent,Accept=[xml;q=0.9,*/*;q=0.8],Accept-Language,Accept-Encoding=[gzip, deflate],Connection=[keep-alive]:Keep-Alive,Accept-Charset,DNT,Referer:Gecko',
    ],

    // MSIE
    's:!:MSIE:6': [
        '0:Accept=[*/*],?Referer,User-Agent,Host:Keep-Alive,Connection,Accept-Encoding,Accept-Language,Accept-Charset:(compatible; MSIE',
        '1:Accept=[*/*],Connection=[Keep-Alive],Host,?Pragma=[no-cache],?Range,?Referer,User-Agent:Keep-Alive,Accept-Encoding,Accept-Language,Accept-Charset:(compatible; MSIE',
    ],
    'g:!:MSIE:Mobile': [
        '1:User-Agent=[IEMobile]::Windows Phone',
    ],

    // Chrome
    's:!:Chrome:11.x to 26.x': [
        '1:Host,Connection=[keep-alive],User-Agent,Accept=[*/*],?Referer,Accept-Encoding=[gzip,deflate,sdch],Accept-Language,Accept-Charset=[utf-8;q=0.7,*;q=0.3]:: Chrom',
        '1:Host,Connection=[keep-alive],User-Agent,Accept=[*/*],?Referer,Accept-Encoding=[gzip,deflate,sdch],Accept-Language,Accept-Charset=[UTF-8,*;q=0.5]:: Chrom',
        '1:Host,User-Agent,Accept=[*/*],?Referer,Accept-Encoding=[gzip,deflate,sdch],Accept-Language,Accept-Charset=[utf-8;q=0.7,*;q=0.3],Connection=[keep-alive]::Chrom',
    ],
    's:!:Chrome:27.x to 42.x': [
      '1:Host,Connection=[keep-alive],Accept=[*/*],User-Agent,?Referer,Accept-Encoding=[gzip,deflate,sdch],Accept-Language:Accept-Charset,Keep-Alive: Chrom',
    ],
    's:!:Chrome:43.x or 50.x': [
        '1:Host,Connection=[keep-alive],Accept=[*/*],User-Agent,?Referer,Accept-Encoding=[gzip, deflate, sdch],Accept-Language:Accept-Charset,Keep-Alive: Chrom',
    ],
    's:!:Chrome:51.x or newer': [
        '1:Host,Connection=[keep-alive],Upgrade-Insecure-Requests=[1],User-Agent,Accept=[*/*],Accept-Encoding=[gzip, deflate, sdch],Accept-Language:Accept-Charset,Keep-Alive: Chrom',
    ],

    // Opera
    's:!:Opera:19.x or newer': [
        '1:Host,Connection=[keep-alive],Accept=[*/*;q=0.8],User-Agent,Accept-Encoding=[gzip,deflate,lzma,sdch],Accept-Language=[;q=0.]:Accept-Charset,Keep-Alive:OPR/',
    ],
    's:!:Opera:15.x-18.x': [
        '1:Host,Connection=[keep-alive],Accept=[*/*;q=0.8],User-Agent,Accept-Encoding=[gzip, deflate],Accept-Language=[;q=0.]:Accept-Charset,Keep-Alive:OPR/',
    ],
    's:!:Opera:11.x-14.x': [
        '1:User-Agent,Host,Accept=[*/*;q=0.1],?Accept-Language=[;q=0.],Accept-Encoding=[gzip, deflate],Connection=[Keep-Alive]:Accept-Charset,X-OperaMini-Phone-UA:) Presto/',
        ],
    's:!:Opera:10.x': [
        '1:User-Agent,Host,Accept=[*/*;q=0.1],Accept-Language=[;q=0.],Accept-Charset=[utf-8, utf-16, *;q=0.1],Accept-Encoding=[deflate, gzip, x-gzip, identity, *;q=0],Connection=[Keep-Alive]::Presto/',
        '1:User-Agent,Host,Accept=[*/*;q=0.1],Accept-Language=[en],Accept-Encoding=[gzip, deflate],Connection=[Keep-Alive]:Accept-Charset:Opera/',
    ],
    's:!:Opera:Mini': [
        '1:User-Agent,Host,Accept=[*/*;q=0.1],Accept-Language=[;q=0.],Accept-Encoding=[gzip, deflate],Connection=[Keep-Alive],X-OperaMini-Phone-UA,X-OperaMini-Features,X-OperaMini-Phone,x-forwarded-for:Accept-Charset:Opera Mini/',
    ],
    's:!:Opera:on Nintendo Wii': [
        '1:User-Agent,Host,Accept=[*/*;q=0.1],Accept-Language=[en],Accept-Charset=[iso-8859-1, utf-8, utf-16, *;q=0.1],Accept-Encoding=[deflate, gzip, x-gzip, identity, *;q=0],Connection=[Keep-Alive]::Nintendo',
    ],

    // Android browser
    's:!:Android:2.x': [
        '1:Host,Accept-Encoding=[gzip],Accept-Language,User-Agent,Accept=[,*/*;q=0.5],Accept-Charset=[utf-16, *;q=0.7]:Connection:Android',
        '1:Host,Connection=[keep-alive],Accept-Encoding=[gzip],Accept-Language,User-Agent,Accept=[,*/*;q=0.5],Accept-Charset=[utf-16, *;q=0.7]::Android',
        '1:Host,Accept-Encoding=[gzip],Accept-Language=[en-US],Accept=[*/*;q=0.5],User-Agent,Accept-Charset=[utf-16, *;q=0.7]:Connection:Android',
    ],
    's:!:Android:4.x': [
        '1:Host,Connection=[keep-alive],Accept=[,*/*;q=0.8],User-Agent,Accept-Encoding=[gzip,deflate],Accept-Language,Accept-Charset=[utf-16, *;q=0.7]::Android',
        '1:Host,Connection=[keep-alive],Accept=[,*/*;q=0.8],User-Agent,Accept-Encoding=[gzip,deflate],Accept-Language,X-Requested-With=[com.android.browser]::Android',
    ],
    'g:!:Android:': [
        '1:Host,User-Agent=[Android],::Android',
    ],

    // Safari
    's:!:Safari:7 or newer': [
        '*:Host,Accept-Encoding=[gzip, deflate],Connection=[keep-alive],Accept=[*/*],User-Agent,Accept-Language,?Referer,?DNT:Accept-Charset,Keep-Alive:KHTML, like Gecko)',
    ],
    's:!:Safari:5.1-6': [
        '*:Host,User-Agent,Accept=[*/*],?Referer,Accept-Language,Accept-Encoding=[gzip, deflate],Connection=[keep-alive]:Accept-Charset:KHTML, like Gecko)',
        '*:Host,User-Agent,Accept=[*/*],?Referer,Accept-Encoding=[gzip, deflate],Accept-Language,Connection=[keep-alive]:Accept-Charset:KHTML, like Gecko)',
    ],
    's:!:Safari:5.0 or earlier': [
        '0:Host,User-Agent,Connection=[close]:Accept,Accept-Encoding,Accept-Language,Accept-Charset:CFNetwork/',
    ],
    'g:!:iOS Browser:': [
        '*:Host,User-Agent=[iPad]::Mac OS X',
        '*:Host,User-Agent=[iPhone]::Mac OS X',
        '*:Host,User-Agent=[iPod]::Mac OS X',
    ],

    // Konqueror
    's:!:Konqueror:4.6 or earlier': [
        '1:Host,Connection=[Keep-Alive],User-Agent,?Pragma,?Cache-control,Accept=[*/*],Accept-Encoding=[x-gzip, x-deflate, gzip, deflate],Accept-Charset=[;q=0.5, *;q=0.5],Accept-Language::Konqueror/',
    ],
    's:!:Konqueror:4.7 or newer': [
        '1:Host,Connection=[keep-alive],User-Agent,Accept=[*/*],Accept-Encoding=[gzip, deflate, x-gzip, x-deflate],Accept-Charset=[,*;q=0.5],Accept-Language::Konqueror/',
    ],

    // Major search robots
    's:!:BaiduSpider:': [
        '1:Host,Connection=[close],User-Agent,Accept=[*/*]:Accept-Encoding,Accept-Language,Accept-Charset:Baiduspider-image',
        '1:Host,Accept-Language=[zh-cn],Connection=[close],User-Agent:Accept,Accept-Encoding,Accept-Charset:Baiduspider',
        '1:Host,Connection=[close],User-Agent,Accept-Language=[zh-cn,zh-tw],Accept-Encoding=[gzip],Accept=[*/*]:Accept-Charset:Baiduspider',
        '1:Host,Connection=[close],User-Agent,Accept-Language=[tr-TR],Accept-Encoding=[gzip],Accept=[*/*]:Accept-Charset:Baiduspider',
        '1:Host,Connection=[close],User-Agent,Accept-Encoding=[gzip],?Accept-Language=[zh-cn,zh-tw],Accept=[*/*]:Accept-Charset:Baiduspider',
        '1:Host,Connection=[close],User-Agent,Accept-Encoding=[gzip],Accept-Language=[tr-TR],Accept=[*/*]:Accept-Charset:Baiduspider',
    ],
    's:!:Googlebot:': [
        '1:Host,Connection=[Keep-alive],Accept=[*/*],From=[googlebot(at)googlebot.com],User-Agent,Accept-Encoding=[gzip,deflate],?If-Modified-Since:Accept-Language,Accept-Charset:Googlebot',
        '1:Host,Connection=[Keep-alive],Accept=[text/plain],Accept=[text/html],From=[googlebot(at)googlebot.com],User-Agent,Accept-Encoding=[gzip,deflate]:Accept-Language,Accept-Charset:Googlebot',
    ],
    's:!:Googlebot:feed fetcher': [
        '1:Host,Connection=[Keep-alive],Accept=[*/*],User-Agent,Accept-Encoding=[gzip,deflate],?If-Modified-Since:Accept-Language,Accept-Charset:-Google',
        '1:User-Agent,?X-shindig-dos=[on],Cache-Control,Host,?X-Forwarded-For,Accept-Encoding=[gzip],?Accept-Language:Connection,Accept,Accept-Charset:Feedfetcher-Google',
    ],
    's:!:Bingbot:': [
        '1:Cache-Control,Connection=[Keep-Alive],Pragma=[no-cache],Accept=[*/*],Accept-Encoding,Host,User-Agent:Accept-Language,Accept-Charset:bingbot/',
    ],
    's:!:MSNbot:': [
        '1:Connection=[Close],Accept,Accept-Encoding=[gzip, deflate],From=[msnbot(at)microsoft.com],Host,User-Agent:Accept-Language,Accept-Charset:msnbot',
    ],
    's:!:Yandex:crawler': [
        '1:Host,Connection=[Keep-Alive],Accept=[*/*],Accept-Encoding=[gzip,deflate],Accept-Language=[en-us, en;q=0.7, *;q=0.01],User-Agent,From=[support@search.yandex.ru]:Accept-Charset:YandexBot/',
        '1:Host,Connection=[Keep-Alive],Accept=[image/jpeg, image/pjpeg, image/png, image/gif],User-Agent,From=[support@search.yandex.ru]:Accept-Encoding,Accept-Language,Accept-Charset:YandexImages/',
        '1:Host,Connection=[Keep-Alive],User-Agent,From=[support@search.yandex.ru]:Accept,Accept-Encoding,Accept-Language,Accept-Charset:YandexBot/',
    ],
    's:!:Yahoo:crawler': [
        '0:Host,User-Agent,Accept=[,image/png,*/*;q=0.5],Accept-Language=[en-us,en;q=0.5],Accept-Encoding=[gzip],Accept-Charset=[,utf-8;q=0.7,*;q=0.7]:Connection:Slurp',
    ],
    's:!:Flipboard:crawler': [
        '1:User-Agent,Accept-Language=[en-us,en;q=0.5],Accept-Charset=[;q=0.7,*;q=0.5],Accept-Encoding=[gzip],Host,Accept=[*; q=.2, */*; q=.2],Connection=[keep-alive]::FlipboardProxy',
        '1:Accept-language=[en-us,en;q=0.5],Accept-encoding=[gzip],Accept=[;q=0.9,*/*;q=0.8],User-agent,Host:User-Agent,Connection,Accept-Encoding,Accept-Language,Accept-Charset:FlipboardProxy',
    ],
    's:!:Spinn3r:crawler': [
        '1:User-Agent,Accept-Encoding=[gzip],Host,Accept=[*; q=.2, */*; q=.2],Connection=[close]:Accept-Language,Accept-Charset:Spinn3r',
    ],
    's:!:Facebook:crawler': [
        '1:User-Agent,Host,Accept=[*/*],Accept-Encoding=[deflate, gzip],Connection=[close]:Accept-Language,Accept-Charset:facebookexternalhit/',
        '1:User-Agent,Host,Accept=[*/*],Connection=[close]:Accept-Encoding,Accept-Language,Accept-Charset:facebookexternalhit/',
    ],
    's:!:paper.li:crawler': [
        '1:Accept-Language=[en-us,en;q=0.5],Accept=[*/*],User-Agent,Connection=[close],Accept-Encoding=[gzip,identity],?Referer,Host,Accept-Charset=[ISO-8859-1,utf-8;q=0.7,*;q=0.7]::PaperLiBot/',
    ],
    's:!:Twitter:crawler': [
        '1:User-Agent=[Twitterbot/],Host,Accept=[*; q=.2, */*; q=.2],Cache-Control,Connection=[keep-alive]:Accept-Encoding,Accept-Language,Accept-Charset:Twitterbot/',
    ],
    's:!:linkdex:crawler': [
        '0:Host,Connection=[Keep-Alive],User-Agent,Accept-Encoding=[gzip,deflate]:Accept,Accept-Language,Accept-Charset:linkdex.com/',
    ],
    's:!:Yodaobot:': [
        '1:Accept-Encoding=[identity;q=0.5, *;q=0.1],User-Agent,Host:Connection,Accept,Accept-Language,Accept-Charset:YodaoBot/',
    ],
    's:!:Tweetmeme:crawler': [
        '1:Host,User-Agent,Accept=[,image/png,*/*;q=0.5],Accept-Language=[en-gb,en;q=0.5],Accept-Charset=[ISO-8859-1,utf-8;q=0.7,*;q=0.7]:Connection,Accept-Encoding:TweetmemeBot/',
    ],
    's:!:Archive.org:crawler': [
        '0:User-Agent,Connection=[close],Accept=[application/xml;q=0.9,*/*;q=0.8],Host:Accept-Encoding,Accept-Language,Accept-Charset:archive.org',
    ],
    's:!:Yahoo Pipes:': [
        '0:Client-IP,X-Forwarded-For,X-YQL-Depth,User-Agent,Host,Connection=[keep-alive],Via:Accept,Accept-Encoding,Accept-Language,Accept-Charset:Yahoo Pipes',
        '1:Client-IP,X-Forwarded-For,X-YQL-Depth,User-Agent,Host,Via:Connection,Accept,Accept-Encoding,Accept-Language,Accept-Charset:Yahoo Pipes',
    ],
    's:!:Google Web Preview:': [
        '1:Referer,User-Agent,Accept-Encoding=[gzip,deflate],Host,X-Forwarded-For:Connection,Accept,Accept-Language,Accept-Charset:Web Preview',
    ],

    // Command-line tools and libraries
    's:!:wget:': [
        '*:User-Agent,Accept=[*/*],Host,Connection=[Keep-Alive]:Accept-Encoding,Accept-Language,Accept-Charset:Wget/',
    ],
    's:!:Lynx:': [
        '0:Host,Accept=[text/sgml, */*;q=0.01],Accept-Encoding=[gzip, compress],Accept-Language,User-Agent:Connection,Accept-Charset:Lynx/',
    ],
    's:!:curl:': [
        '1:User-Agent,Host,Accept=[*/*]:Connection,Accept-Encoding,Accept-Language,Accept-Charset:curl/',
        '1:Host,User-Agent,Accept=[*/*]:Connection,Accept-Encoding,Accept-Language,Accept-Charset:curl/',
    ],
    's:!:links:': [
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[gzip, deflate, bzip2],Accept-Charset=[us-ascii],Accept-Language=[;q=0.1],Connection=[Keep-Alive]::Links',
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[gzip,deflate,bzip2],Accept-Charset=[us-ascii],Accept-Language=[;q=0.1],Connection=[keep-alive]::Links',
    ],
    's:!:elinks:': [
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[bzip2, deflate, gzip],Accept-Language:Connection,Accept-Charset:ELinks/',
    ],
    's:!:Java:JRE': [
        '1:User-Agent,Host,Accept=[*; q=.2, */*; q=.2],Connection=[keep-alive]:Accept-Encoding,Accept-Language,Accept-Charset:Java/',
    ],
    's:!:Python:urllib': [
        '1:Accept-Encoding=[identity],Host,Connection=[close],User-Agent:Accept,Accept-Language,Accept-Charset:Python-urllib/',
    ],
    's:!:w3m:': [
        '0:User-Agent,Accept=[image/*],Accept-Encoding=[gzip, compress, bzip, bzip2, deflate],Accept-Language=[;q=1.0],Host:Connection,Accept-Charset:w3m/',
    ],
    's:!:libfetch:': [
        '1:Host,User-Agent,Connection=[close]:Accept,Accept-Encoding,Accept-Language,Accept-Charset:libfetch/',
    ],
    's:!:Google AppEngine:': [
        '1:User-Agent,Host,Accept-Encoding=[gzip]:Connection,Accept,Accept-Language,Accept-Charset:AppEngine-Google',
    ],
    's:!:WebOS:': [
        '1:Host,Accept-Encoding=[gzip, deflate],User-Agent,Accept=[,*/*;q=0.5],Accept-Language,Accept-Charset=[utf-8;q=0.7,*;q=0.3]:Connection:wOSBrowser',
    ],
    's:!:xxxterm:': [
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[gzip]:Connection,Accept-Language,Accept-Charset:xxxterm',
    ],
    's:!:Google Desktop:': [
        '1:Accept=[*/*],Accept-Encoding=[gzip],User-Agent,Host,Connection=[Keep-Alive]:Accept-Language,Accept-Charset:Google Desktop/',
    ],
    's:!:luakit:': [
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[gzip],Connection=[Keep-Alive]:Accept-Language,Accept-Charset:luakit',
    ],
    's:!:Epiphany:': [
        '1:Host,User-Agent,Accept=[*/*],Accept-Encoding=[gzip],Accept-Language:Connection,Accept-Charset,Keep-Alive:Epiphany/',
    ],
};
