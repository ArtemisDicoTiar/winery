cat ./bin/dockerPW.txt | sudo docker login --username dicotiar --password-stdin
sudo docker build -t covid_tmp ./
sudo docker tag covid_tmp dicotiar/covid_tmp:version1
sudo docker push dicotiar/covid_tmp:version1

#de6557a231befc58fb1de42f4a0c20ba0473bcba
exit 0
