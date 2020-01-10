# Network fingerprinter

> Network fingerprinter is a scalable, easy to deploy network traffic inspection system for purely passive OS and application fingerprinting

*Read this in other languages: [English](README.md), [Russian](README.ru.md).*

## Table of Contents

- [Purpose](#purpose)
- [System architecture](#system-architecture)
	- [Sensor](#sensor)
	- [Collector](#collector)
	- [Analyzer](#analyzer)
- [Installation](#installation)
- [Signature analysis](#signature-analysis)

## Purpose
Well-known systems for passive OS fingerprinting such as p0f, satori, etc are powerful, but have some disadvantages for production use:
* Embrassing inspection huge traffic alerts
* For passive fingerprinting it's not necessary to store all traffic dump, except flow samples such as handshake tcp SYN/SYN+ACK, tls client hello and others required for signature analysis packet samples. Flows are powerful, but existing solutions allow to store either all trafic or alerts only
* Lack of GUI
* Complicated production configuration

## System architecture

Internally, system consists of 3 modules:
* [Sensor](#sensor)
* [Collector](#collector)
* [Analyzer](#analyzer)

#### Sensor 

Sensor is a **tshark**-driven selective traffic exporter, it's exports only SYN, SYN+ACK, TLS client hello and HTTP requests/responses to external **elasticsearch** index. System can have as many sensors as needs.

#### Collector

Collector is an **elasticsearch** cluster. Also, system can have more than one collector if needs.

#### Analyzer

Analyzer is a **kibana** GUI for **packets-\*** index inspection and **analytics-app** traffic fingerprints view. Also, analytics-app allows to upload existing pcap[ng] dump.

> All system components can be installed on signle host

## Installation

Every module has an `.env` file with **docker-compose** configuration, you should replace data in this file. 

##### Firstly, install collector module:
You needs to create folder which will be used elasticsearch for persist data
In our sample, it's a `./data` directory in `collector` folder, as configured in `docker-compose.yml`:
```
volumes:
  elasticsearch:
    driver_opts:
      type: none
      device: $PWD/data
      o: bind
```
You need to replace string `device: $PWD/data`  and make sure that this directory exists, or remove lines `3-6` for use docker-driven volume.

All configuration steps: 
```
cd  collector
vim .env # set environment variables
vim docker-compose.yml # set elasticsearch volume device 
docker-compose up -d # run in detach mode
```
Wait, until elasticsearch ready. (see docker logs CONTAINER_NAME)

##### Next, let's install sensor:

If elasticsearch is ready (but it's not necessary - containers always restart on failure), simply edit `.env` in `sensor` directory and run `docker-compose up -d`

##### Prepare analyzer

Now, we can install and run analyzer as simple as edit `.env` and run `docker-compose up -d` in `analytics-app` directory.
Open `http://${host}:5601` to open kibana GUI and `http://${host}:3000` to open analytics app, where `host` is your ip or domain name.

## Signature analysis

App consists of three tabs:
* Streams
* Statistics
* Upload \*.pcap

First tab displays filtered streams list:\
![Streams list](https://i.imgur.com/6QBX5vh.png)


You can filter streams using `Search` form:\
![Filter](https://i.imgur.com/G3YFbCi.png)

To store data in buffer (for paste in filter, for example) click `copy` button beside data:\
![Copy](https://i.imgur.com/CEoOfhZ.png)

Columns description:
* First column consists **common data** about stream:
	* **SensorID** - for sensor it matches pattern 'sensor-\*', for pcap-player - 'pcap-player-*'
	* **SNI** (server name indication from tls headers, if extension used)
	* **Application layer protocols** - list of all application protocols used in stream
* **Date and time** - timestamp of first captured packet in TCP stream (usually, SYN, but can be http request or TLS client hello)
* **MAC, IP, Port.** Source is a host, that initiates TCP request (client) and destination is a host, that receives request and send TCP response (server), but as known, TCP is full-duplex protocol and the names "client" and "server" are conditional.
* **Fingerprint** - defined fingerprints of stream, they may include TCP, TLS and HTTP fingerprints for source (by SYN, HTTP request and TLS client hello) and TCP, HTTP fingerprints for destination (by SYN+ACK, HTTP response)

Statistics menu item has two tabs: *by clients* and *by servers*:\
![stat-tabs](https://i.imgur.com/CoGpUNB.png)

Each tab has a grid with (ip, mac) discovered tuples from traffic.\
![by-clients](https://i.imgur.com/FBhRkMb.png)

Every row is clickable and you can see detailed information about selected host by click on row (opening in right-side drawer):\
![drawer](https://i.imgur.com/JKTtCAw.png)
As you can see, this information includes all fingerprints from stream and reference to these streams list, also in this example showed case of multiple discovered fingerprints (TLS) and matches from SSL blacklist (Dridex, Tofsee). 

Pcap uploading:\
![pcap-upload](https://i.imgur.com/dTQf184.png)\
Simply drag'n'drop captured traffic dump (one or more files) or click directly on area to upload. After processing, streams will be available on TCP streams tab, if dump includes significant for signature analysis packets (SYN, SYN+ACK, HTTP request/response or TLS client hello)

## License
This project is licensed under the terms of the Apache 2.0 open source license. Please refer to [LICENSE](LICENSE) for the full terms.
