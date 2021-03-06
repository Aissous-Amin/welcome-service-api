# Insight

**Questions**

1. Describe in detail how you would store and query the data, and what kind of mechanism you would leverage to consistently deliver short response times and guarantee the highest uptime possible.
    - In order to guarantee high availability of our service, we can make the application scalable : In our case the application is stateless
        - So possibility of scaling horizontally (Example: deploy in kubernetes node)
    - Use a load balancer to optimize the processing of traffic management
    - Use a distributed cache system to lighten the traffic on the database (Redis)
    - Use distributed databases (Elasticsearch)
    - Use a micro service architecture for optimal distribution based on traffic.


2. What do you identify as possible risks in the architecture that you described in the long run, and how would you mitigate those?
    - The hexagonal architecture can become complicated to maintain in the long term if we do not respect the basic principles which are based on three techniques:
        - Explicitly separate User-Side, Business Logic and Server-Side
        - Dependencies go to Business Logic
        - We isolate borders by Ports and Adapters

    - here are some important part if I have to clarify what is missing today in this application :
        - No paging system
        - No integrated logger system
        - No authentication system
        - No unit test (lack of time :/)
3. What are the key elements of your architecture that would need to be monitored, and what would you use to monitor those ?
    - We can monitor the following elements
        - Monitoring the http traffic
            - For example : get response time for incoming requests.
        - Monitoring the execution time
        - Monitoring the RAM CPU use
        - Error and exception monitoring of the application
        - If we use kubernetes we can monitor the cluster health (pods, service, ingress)
    - We can use the following tools :
        - We can use ElasticApmConfig Elastic Agent that allows us to monitor software services and applications in real-time, by collecting detailed performance information on response time for incoming requests, database queries, calls to caches, external HTTP requests, and more. @CopyRight [Source](https://www.elastic.co/fr/apm?ultron=B-Stack-Trials-EMEA-S-FR-BMM&gambit=Elasticsearch-ElasticApmConfig&blade=adwords-s&hulk=cpc&Device=c&thor=%2Bapm%20%2Belasticsearch&gclid=CjwKCAiAmrOBBhA0EiwArn3mfGz4VZhMGU-N7HfJyagy3LOIDFXBNITkwdWA7P9jQ9Us16oax0GIpBoCrtQQAvD_BwE)
        - We can use a cloud solution like DataDog or  AZURE APIM
            - With azure APIM we can manage our gateway, secure it, expose it to external clients and also monitor it using the azure services such as log analytics and azure monitor???etc


**Note**
- Next features :
    - The pagination mechanism is to do with monggose paginate.
    - Unit test is also to do with : mocha and sinon
    - Integration test to do with : supertest
    - Setup the logger middleware function
    - Setup ElasticApmConfig Elastic Agent to index log