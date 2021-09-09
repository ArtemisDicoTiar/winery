#!/bin/bash
# shellcheck disable=SC2154

docker stop covid_tmp
docker rmi covid_tmp

docker build -t covid_tmp ./

help()
{
    echo "Usage : $0 --host|-H [host_name] --port|-P [port_num]"
}

while getopts "H:P:" opt; do
    case $opt in
        H)
            host_name=$OPTARG
            ;;
        P)
            port_num=$OPTARG
            ;;
        *)
            help
            exit 0
            ;;
    esac
done

if [ -z "$host_name" ] || [ "$port_num" -eq 0 ]
then
    help
    exit 0
fi


docker run --rm -d -it -h "$host_name" -p "$port_num":80 --name covid_tmp covid_tmp


