**Iron Swords Missile Alerts Dashboard**

Welcome to the Iron Swords Missile Alerts Dashboard! This website provides real-time data about missile alerts during the current conflict in Israel, known as the Iron Swords War. The inspiration behind this project stemmed from a simple yet crucial need - to determine the safest times for daily activities like taking a shower and minimizing the risk of being caught off guard by sirens.

**Project Overview**

The primary objective of this project is to analyze and visualize missile alert data to identify the safest hours of the day across various cities in Israel. Here's what you can explore on this website:

- Number of Sirens: View the number of missile sirens reported in each city across Israel.
- Average Daily Sirens: Discover the average number of missile sirens experienced per day.
- Safest Hours: Explore calculated "safest" hours within a day, based on minimal siren activity in each city, presented through intuitive visual data charts.

Tech Stuck:
- React
- Node
- Express
- MongoDB

**App Architecture:**

![Untitled (3)](https://github.com/Vichenchov/Alerts-Data-Project/assets/63870370/744472e1-b77f-4bfc-9ac0-81b671e7def5)


- Server Side - A service responsible for handling communication between the client and the database.
- API Gateway - A service facilitating communication between the database and the Pikud Haoref API, which provides real-time missile alert data.

**Challenges Faced**

Throughout the development process, several obstacles were encountered:

_Data Source Creation_: Due to limited access to the official database storing alert data, an algorithm was developed to parse and format data sourced from the 'Red Alert' Telegram group.

_Real-time Alert Integration_: The Pikud Haoref API required server calls to be made from within Israel. Overcoming this hurdle involved deploying the service on a Virtual Machine in the Israel region of Google Cloud.


Link to the website:

https://reactalerts.onrender.com

**PS:**
Please note that initial loading may take some time due to server location discrepancies, but this issue will be addressed soon.

I shut down the Pikud Haoref Gateway for now cause the free trial has ended and they started to charge money.

The website:
![Untitled (4)](https://github.com/Vichenchov/Alerts-Data-Project/assets/63870370/15fe53dc-96c5-4112-8d4c-3350c783626a)

