yarn build:uat
rm -rf ~/Desktop/docker/universe/pisces/dist
cp -r dist ~/Desktop/docker/universe/pisces/
cp nginx.conf ~/Desktop/docker/universe/pisces/default.conf
cp docker-compose.yml ~/Desktop/docker/universe/pisces/docker-compose.yml
cd ~/Desktop/docker/universe/pisces

docker compose down
docker compose rm -f
docker compose up -d
