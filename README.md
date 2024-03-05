# final-project-server


 Base URL/auth
| HTTP Method | URI PAth | Description       |
|-------------|----------|-------------------|
| POST        | /signup  | Signup  user      |
| POST        | /login   | Login user        |
| GET         | /verify  | Verify auth token |
 
 
 Base URL/professionals
| HTTP Method | URI path                | Description                       |
|-------------|-------------------------|-----------------------------------|
| GET         | /                       | All professionals list            |
| POST        | /newProfessional        | Create new professional           |
| GET         | /:professionalId        | Matching ID professional details  |
| PUT         | /:professionalId        | Matching ID professional edition  |
| DELETE      | /:professionalId        | Matching ID professional deletion |


Base URL/clients
| HTTP Method | URI path          | Description                 |
|-------------|-------------------|-----------------------------|
| POST        | /newClient        | Create new client           |
| GET         |/:clientId         | Matching ID client details  |
| PUT         |/:clientId         | Matching ID client edit     |
| DELETE      |/:clientId         | Matching ID client deletion |


BaseURL/requests
| HTTP Method | URI path           | Description                 |
|-------------|--------------------|-----------------------------|
| GET         | /                  | All requests list           |
| POST        | /newRequest        | Create new request          |
| GET         | /:requestId        | Matching ID request details |
| PUT         | /:requestId        | Matching ID request edit    |
| DELETE      | /:requestId        | Matching ID client deletion |


BaseURL/pets
| HTTP Method | URI path       | Description              |
|-------------|----------------|--------------------------|
| GET         | /              | All pets list            |
| POST        | /newPet        | Create new pet           |
| GET         | /:petId        | Matching ID pet details  |
| PUT         | /:petId        | Matching ID pet edition  |
| DELETE      | /:petId        | Matching ID pet deletion |