#start docker
sudo systemctl start docker.service

# docker hello-world
sudo docker run hello-world

# docker nginx
sudo docker run -p 80:80 nginx

# creating ami command
sudo yum install java docker postgresql15 -y
sudo systemctl start docker.service
sudo systemctl enable docker
sudo usermod -aG docker $USER


# Docker Command For Postgres
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

# connect postgres
psql -h 172.31.33.38 -U postgres


#user data
#!/bin/bash

docker run -d -p 80:80 nginx