# Python 3.12 + distro Wireshark (multi-arch Debian Bookworm).
# No secrets, registry calls, or Elasticsearch bootstrap at build time.
FROM python:3.12.12-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN apt-get update \
    && apt-get install -y --no-install-recommends tshark ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/share/tshark
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY *.py ./
COPY espcap.yml ./

# Credentials and interface are runtime environment variables.
ENTRYPOINT ["python", "index.py"]
