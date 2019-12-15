#TODO REMOVE
ARG ELK_VERSION
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

# Create required file structure and set the permissions accordingly
USER root
RUN mkdir -p /data
RUN chown -R logstash:logstash /srv
RUN curl -Lo /srv/netflow.yaml https://raw.githubusercontent.com/logstash-plugins/logstash-codec-netflow/master/lib/logstash/codecs/netflow/netflow.yaml
RUN /usr/share/logstash/bin/logstash-plugin install --no-verify logstash-codec-netflow

# Drop permissions
USER logstash
