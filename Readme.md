step 0:
docker network create voting-network

Step 1

run the mongo container

docker run --name mongodb-container -p 27017:27017 --network voting-network -d mongo:latest

step 2: Run the backend container

docker run --name backend -p 5001:5001 --network voting-network nithish/backend

step 3: Run the react container

docker run --name frontend -p 5174:80 --network voting-network nithish/frontend

docker network inspect voting-network

http://localhost:5174/
