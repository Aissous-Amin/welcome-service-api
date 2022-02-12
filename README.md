# Nodejs Hexagonal Starter Kit
**A starter kit to master your API development**

## Installation And Project Launch

This is an ExpressJs application service, there are two ways to launch the application :
1. With docker-compose
    - To do that you need to install [Docker-Compose](https://docs.docker.com/compose/install/)
    - Once docker-compose is installed you can launch the project with the following command : `docker-compose up -d`
        - you can check if the service is started with the following command : `docker-compose ps`

2. Without docker-compose, for this you need to install the following tools
    - Install [Node.js](https://nodejs.org) (LTS version)
    - Install [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)
    - Run the following command :
        - `npm install`
        - `npm run prepare`
        - `npm run start`
        
3. The project should be imported from the [GitHub](https://github.com/Aissous-Amin/wemaintain-backend-test/tree/develop)
     - You can also get it with the following command : 
          - `git clone https://github.com/Aissous-Amin/wemaintain-backend-test.git`
              
4. Generation of JsDoc documentation:
     - `npm run doc`

5. to consult the interface documentation of our service you can consult the swagger here: `Docs/api-specification`

6. Get help to format your commit message with Commitizen :
    - `npx cz`
   
     
**Note** 
- you can ping the service with this command : 
    - `curl localhost:80/api/messages`

## Architecture

**Les différentes couches de l’architecture**

****Couche Application**** 
- Orchestrer les objets du domaine pour exécuter les tâches requises par les utilisateurs finaux.

****Couche Domaine**** 
- Comprend toute la logique métier, les entités, les événements et tout autre type d'objet qui contenant la logique métier.

****Couche Infrastructure**** 
- fonctionnalités techniques qui prennent en charge les couches ci-dessus, comme la couche réseau par exemple.

****Couche Persistance**** 
- Permet de gérer la partie Persistance du service.

****DataBanding****
- La communication entre les couches peut seulement se faire de manière descendante, autrement dit une couche ne peut jamais communiquer directement avec une couche située au-dessus d'elle.
