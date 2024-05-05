# AnttRobotics

AnttRobotics is a simple CRUD API for managing user data. It's built using Express.js and MongoDB with Mongoose.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/ShafayetAhmad/AnttRobotics.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up MongoDB:
   - Make sure MongoDB is installed and running locally.
   - Modify the `MONGODB_URI` variable in `app.ts` to point to your MongoDB instance.

## Usage

Start the server:

```
npm run build
npm start
```

The server will start running on http://localhost:3000. If you want to run the server in another port then you can change the port in `app.ts` file.

### API Endpoints

#### Create User

```
POST /api/v1/users
```

Creates a new user with the provided information.

Request Body:

```json
{
  "uid": "123456",
  "email": "user@example.com",
  "role": "showaUser",
  "status": "in-progress",
  "name": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "addresses": [
    {
      "isDeleted": false,
      "address": {
        "street": "123 Main St",
        "city": "City",
        "prefecture": "Prefecture",
        "postalCode": "12345",
        "country": "Country",
        "buildingName": "Building",
        "roomNumber": "101"
      }
    }
  ]
}
```

#### Get User

```
GET /api/v1/users
```

Retrieves user data based on the provided query parameters.

Query Parameters:

- `email`: User's email address
- `phone`: User's phone number

#### Health Check

```
GET /
```

Returns "Hello World!" to indicate that the server is running.
