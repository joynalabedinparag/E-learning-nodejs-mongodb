# E-Learning App
_E-Leaning Backend with Node.Js & MongoDB_

## Project setup 
> - Install & Run Docker [https://docs.docker.com/engine/install/]
> - Run `docker compose up`
> - Run `npm install`
> - Run `npm start`

## API Endpoints

### Courses
> GET /api/courses
  - Get all courses information
  - Parameters: None
  - Response: 
      StatusCodes: 200 - Success
                   500 - Error
      Response: JSON - Success
                Null - Error

> POST /api/courses
  - Creates a new course
  - Parameters:  
    - title (mendatory) - Type: String
    - description (mendatory) - Type: String
    - duration (mendatory) - Type: Integer
    - instructor (optional) - Type: String
    - price (optional) - Type: Double
   - Response: 
      StatusCodes: 200 - Success
                   500 - Error

> GET /api/courses/:prop/:value
  - Filter Courses by a property
  - Parameters: 
    - :prop - accepts one the following 
        - instructor, title, description', price
    - :value - search string (partially match the data)
  - Response: 
        StatusCodes: 200 - Success
                     500 - Error
                     400 - Invalid Property Name
        Response: JSON - Success
                  ErroMsg - Error
### Enrollment     
> GET /api/enrollment
  - Get all enrollment data
  - Parameter: None
  - Response: JSON - Success
                Null - Error
                
> POST /api/enrollment
  - Creates a new enrollment (after checking the validity of the course id)
  - Parameters:  
    - student_name(mendatory) - Type: String
    - course_id (mendatory & must be a valid course id) - Type: String
    - enrollment_date (mendatory) - Type: Date E.G. - 2023-12-18
    - Response: 
            StatusCodes: 200 - Success
                        500 - Error
            Response: JSON - Success
                      ErroMsg - Error
## Perform Tests
Run `npm run test`