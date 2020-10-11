#!/bin/bash
docker stop covid_tmp
docker rmi covid_tmp

echo enter final port:
read -r port_num

echo enter host name:

read -r host_name

docker build -t covid_tmp ./

# shellcheck disable=SC2154
if ${#hostname} == 0
then
	docker run --rm -d -it -h "localhost" -p "$port_num":80 --name covid_tmp covid_tmp
else
	docker run --rm -d -it -h "$host_name" -p "$port_num":80 --name covid_tmp covid_tmp
fi
exit 0
