var fs = require('fs');

fs.readFile('./signatures/p0f.fp', 'utf8', function(err, contents) {
    const strings = contents.split('\n');
    const tcpSynStart = strings.findIndex(str => str.match(/\[tcp:request]/));
    const tcpSynAckStart = strings.findIndex(str => str.match(/\[tcp:response]/));
    const httpRequestStart = strings.findIndex(str => str.match(/\[http:request]/));
    const httpResponseStart = strings.findIndex(str => str.match(/\[http:response]/));

    const synSignatures = parseBlockSignatures(strings, tcpSynStart, tcpSynAckStart);
    const synAckSignatures = parseBlockSignatures(strings, tcpSynAckStart, httpRequestStart);
    const httpRequestSignatures = parseBlockSignatures(strings, httpRequestStart, httpResponseStart);
    const httpResponseSignatures = parseBlockSignatures(strings, httpResponseStart, strings.length);

    prettyPrint('syn', synSignatures);
    prettyPrint('synAck', synAckSignatures);
    prettyPrint('httpRequest', httpRequestSignatures);
    prettyPrint('httpResponse', httpResponseSignatures);
});

fs.copyFile('./signatures/userAgents.json', 'server/signatures/userAgents.json', () => {});

function prettyPrint(filename, signatures) {
    fs.writeFileSync(`server/signatures/${filename}.json`, JSON.stringify(signatures, null, 2));
}

function parseBlockSignatures(strings, blockStart, blockEnd) {
    const signatures = {};
    let signaturesIndex = blockStart + 1;

    while (signaturesIndex < blockEnd) {
        let currentString = strings[signaturesIndex];

        if (currentString.match(/^label/)) {
            const labelMatch = currentString.match(/^label\s+=\s+(.*)/);
            let label = labelMatch[1];
            signatures[label] = [];

            signaturesIndex++;
            currentString = strings[signaturesIndex];

            while (currentString.match(/^sys/) || currentString.match(/^\s*$/)) {
                signaturesIndex++;
                currentString = strings[signaturesIndex];
            }

            while (currentString.match(/^sig/)) {
                const sigMatch = currentString.match(/^sig\s+=\s+(.*)/);
                const sig = sigMatch[1];
                signatures[label].push(sig);

                signaturesIndex++;
                currentString = strings[signaturesIndex];
            }

            continue;
        }

        signaturesIndex++;
    }

    return signatures;
}

console.log('after calling readFile');
