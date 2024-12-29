## Start Database Using Docker Compose
Since we are using many databases, it is recommended to use docker compose to start the environment
```
docker-compose up -d
```
You can adjust the ports and other configuration accordingly, by modifying [docker-compose.yml](docker-compose.yml), as well as the env files in each system's backend directory.

To stop the containers, run:
```
docker-compose down
```

## Ports
### Frontend Ports
```
3000 -> core
```

### Backend Ports
```
8080 -> core
```