# courseAPI 
A REST API that can serve programming course resources to a client.

# Built With
- Express JS (back-end framework for all the routing and data storage)
- Joi (data validation tool for Javascript)

## End Points

 route | METHOD | function
------- | -------- | ------
/api/courses/ | GET | get all courses
/api/courses/id | GET | get a course with a specific id
/api/courses/ | POST | create a new course
/api/courses/id | PUT | update a courses with a specific id
/api/courses/id | DELETE | delete a course with a given id

## Run With
` npm install && node index,js` 
