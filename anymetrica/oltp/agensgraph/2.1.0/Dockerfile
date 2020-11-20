# Source: https://github.com/bitnine-oss/agensgraph-docker/blob/master/AgensGraph/Dockerfile
FROM centos:7.6.1810

RUN yum install -y gcc glibc glib-common readline readline-devel zlib zlib-devel flex bison vim java-1.8.0-openjdk net-tools

RUN groupadd -r agens --gid=1000 && \
    useradd --uid=1000 -m -c "AgensGraph User" -p agens -g agens agens

RUN mkdir -p /home/agens/AgensGraph/data
RUN chown -R agens:agens /home/agens
RUN chmod -R 700 /home/agens

ENV AGDATA=/home/agens/AgensGraph/data \
    PATH=/home/agens/AgensGraph/bin:$PATH \
    LD_LIBRARY_PATH=/home/agens/AgensGraph/lib:$LD_LIBRARY_PATH \
    AGHOME=/home/agens/AgensGraph

# Download and unpack agens distro
RUN curl -q -L https://github.com/bitnine-oss/agensgraph/releases/download/v2.1.0/AgensGraph_v2.1.0_linux_CE.tar.gz | tar -xz -C /home/agens

RUN mkdir -p /home/agens/scripts

COPY entrypoint.sh /home/agens/scripts
RUN chmod +x /home/agens/scripts/entrypoint.sh

COPY wait-for.sh /home/agens/scripts
RUN chmod +x /home/agens/scripts/wait-for.sh

USER agens
EXPOSE 5432
EXPOSE 8085

RUN set -e
RUN initdb

RUN sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" $AGDATA/postgresql.conf
RUN echo "host	all	all	0.0.0.0/0	trust" >> $AGDATA/pg_hba.conf

RUN ag_ctl start; sleep 5;\
    createdb;\
    agens -c "create graph agens_graph";\
    ag_ctl stop

ENTRYPOINT ["/home/agens/scripts/entrypoint.sh"]
