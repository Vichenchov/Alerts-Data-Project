The website shows data about Missiles alerts in the current Iron Swords war in Israel.

The idea came from wanting to know when is the safest time to go to shower and not get caught by a siren :) I aimed to find the "safest" hours in a day, the time with the smallest amount of sirens in my city, and in each other cities in Israel.

The site shows different pieces of data:

Number of Sirens in each city in Israel
Average amount of sirens in a day
Calculate the "safest" hours in a day And more data in different visual data charts, in each city in Israel

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
- I don't have access to the DB that stores all the data about the alerts so I had to create the data source bymyself:
    - I remmembers that I have all the data in 'Red Alert' Telegram groupe so I managed to export all the data from there. The problem is that it wasn't formatted well so I've built an algorithem
      that converts the data from the Telegram groupe and suits the needs for my app. (I added the algorithem to this repo in a separete file). I also helped me to use data from the first day of the war.
    - I've built the api gatway in the wey that I can listen to real time alerts from the Pikud Haoref API and store in a db.
    - Now I managed to have 'history data' from the first day of the war and listen to new alerts in real time.
- Another problem was to listen to the alerts from the Pikud API and store it on my db. They require you to have you server that making the API calls to locate in Israel:
  - I remeberd that Google Cloude has servers in Israel so I deploy the service on a VN in Israel Region.


link to the website:

https://reactalerts.onrender.com

**ps:**
It takes time to load on the first load. It is probably because the servers are located in different regions - this will be fixed soon.
