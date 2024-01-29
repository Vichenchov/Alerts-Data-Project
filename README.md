The website shows data about Missiles alerts in the current Iron Swords war in Israel.

The idea came from wanting to know when is the safest time to go to shower and not get caught by a siren :) I aimed to find the "safest" hours in a day, the time with the smallest amount of sirens in my city, and in each other cities in Israel.

The site shows different pieces of data:

- Number of Sirens in each city in Israel 
- The average amount of sirens in a day 
- Calculated "safest" hours in a day and more data in different visual data charts, in each city in Israel

Tech Stuck:
- React
- Node
- Express
- MongoDB

App Architecture: 
![image](https://github.com/Vichenchov/ReactAlerts/assets/63870370/951d6e5f-a35b-4ef2-abe8-dfeef22e459a)

- Server Side - A Service that handles the communication between the Client and the DB
- API Gateway - A Service that communicates between DB and the Pikud Haoref API, which is listening for the Misselse data in real time

**Obsticals I've faced:**
- I don't have access to the DB that stores all the data about the alerts so I had to create the data source by myself:
    - I remember that I had all the data in the 'Red Alert' Telegram group so I managed to export all the data from there. The problem is that it wasn't formatted well so I've built an algorithm that converts the        data from the Telegram group and suits the needs of my app. (I added the algorithm to this repo in a separate file).
      It also helped me to use data from the first day of the war and not rely only on new data.
    - I've built the API gateway in a way that I can listen to real-time alerts from the Pikud Haoref API and store them in a DB.
    - Now I managed to have 'history data' from the first day of the war and listen to new alerts in real-time.
- Another problem was listening to the alerts from the Pikud API and storing them in my DB. They require you to have your server that making the API calls located in Israel:
  - I remember that Google Cloud has servers in Israel so I deploy the service on a VN in Israel Region.


Link to the website:

https://reactalerts.onrender.com

**PS:**
It takes time to load on the first load. It is probably because the servers are located in different regions - will be fixed soon.
