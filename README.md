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
  - Parameter: None

> POST /api/courses
  - Creates a new course
  - Parameters:  
    - title (mendatory) - Type: String
    - description (mendatory) - Type: String
    - duration (mendatory) - Type: Integer
    - instructor (optional) - Type: String
    - price (optional) - Type: Double

> GET /api/courses/:prop/:value
  - Filter Courses by a property
  - Parameters: 
    - :prop - accepts one the following 
        - instructor, title, description', price
    - :value - search string (partially match the data)

### Enrollment     
> GET /api/enrollment
  - Get all enrollment data
  - Parameter: None

> POST /api/enrollment
  - Creates a new enrollment
  - Parameters:  
    - student_name(mendatory) - Type: String
    - course_id (mendatory & must be a valid course id) - Type: String
    - enrollment_date (mendatory) - Type: Date E.G. - 2023-12-18

## Perform Tests
Run `npm run test`