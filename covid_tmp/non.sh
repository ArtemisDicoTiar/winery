#!/bin/sh

EXIST_BLUE=$( sudo docker images -q covid_tmp_blue )

if [ -z "$EXIST_BLUE" ]; then

  echo "BLUE EXIST";
  # current: Blue running
  # -> green build -> green running -> Blue Down
    docker build -t covid_tmp_green ./ -f app1.Dockerfile
    docker run --rm -d -it -h localhost -p 18080:80 --name covid_tmp_green covid_tmp_green

    sleep 3

    docker stop covid_tmp_blue
    docker rmi covid_tmp_blue

else
  echo "GREEN EXIST";
  # current: green running
  # -> Blue build -> Blue running -> green Down
    docker build -t covid_tmp_blue ./ -f app2.Dockerfile
    docker run --rm -d -it -h localhost -p 18081:80 --name covid_tmp_blue covid_tmp_blue

    sleep 3

    docker stop covid_tmp_green
    docker rmi covid_tmp_green
fi