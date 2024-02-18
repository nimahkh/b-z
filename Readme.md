# TODO Application Development: A Comprehensive Guide
## Overview
This application allows users to create, manage, and categorize tasks, incorporating deadlines and marking tasks as completed. 
Emphasizing maintainability, security, and performance, I adopted a structured approach using modern technologies and architectural patterns. 
Below, I detail the architecture, technology choices, setup instructions, and additional considerations that shaped this project.

## Technology Stack
- **Typescript:** to make the project type safe and reliable
- **Backend:** Node.js with Express framework
- **Frontend:** React
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** Tailwind CSS
- **Development & Build Tools:** Docker, Vite, Jest for testing

### Setup Instructions

##### Using Docker (Recommended)
Ensure Docker is installed and running on your machine.
Execute `npm run dev:docker` from the project root. This command builds and starts the necessary containers, setting up the entire stack automatically.
Access the frontend at `http://localhost:5177`.
##### Manual Setup
Ensure PostgreSQL is installed and properly configured.
- Rename the `.env.example` to `.env` inside the `backend` directory.
- Adjust the Env variables in `backend` folder.
- Run `npm run migrate && npm run seed` to set up the database schema and initial data.
- Run `NODE_ENV=development npm run dev` to start both frontend and backend servers.

##### Authentication
**Initial Users:** After running migrations and seeders, use user1 or user2 with password 123 for initial login.
**Registration:** New users can sign up through the registration page accessible from the login screen.

## Architecture & Design Choices
### Backend
- **CQRS Pattern:** Adopted for its clarity and maintainability, separating read (Query) operations from write (Command) operations, thus enhancing scalability and allowing for more optimized data retrieval and storage strategies.
- **Types Sharing**: Utilized a shared types directory for common types between frontend and backend, promoting type safety and consistency across the stack.
JWT Authentication: Chosen for its stateless nature and scalability, enabling secure, token-based user authentication.
- **PostgreSQL**: Selected for its reliability, ACID compliance, and rich feature set, ideal for complex queries and data integrity.
Docker Integration: Facilitates easy setup and ensures consistent environments across development and production, encapsulating the application and its dependencies within containers.
- **Jest:** Chosen for its expressive syntax and extensive support for both BDD and TDD assertion styles, facilitating comprehensive unit and integration tests.
### Frontend
- **Tailwind CSS:** For its utility-first approach, enabling rapid UI development with a smaller footprint and customization ease.
- **React Context:** Used for managing authentication state, providing a simpler alternative to Redux for this application's scale.
- **Vite:** Preferred for its fast, lean build system, enhancing development experience with efficient hot module replacement (HMR).
- **Drag and Drop UI**: Improves user experience, allowing intuitive task management through interactive elements.


### Extra
- **Creating a new migration**: By running the `npm run migration:create --migration=MigrationName` you can easily crate a new migration
- **Axios utilities in Frontend**: to improve the network layer. 

### Project Structure

```bash
.
├── backend
│   ├── src
│   │   ├── @types
│   │   │   └── express
│   │   ├── domains
│   │   │   ├── authentication
│   │   │   │   ├── application
│   │   │   │   │   └── command
│   │   │   │   ├── domain
│   │   │   │   │   ├── dto
│   │   │   │   │   ├── entities
│   │   │   │   │   └── repository
│   │   │   │   ├── infrastructure
│   │   │   │   ├── presentation
│   │   │   │   │   └── controller
│   │   │   │   └── services
│   │   │   └── task
│   │   │       ├── application
│   │   │       │   ├── command
│   │   │       │   └── query
│   │   │       ├── domain
│   │   │       │   ├── dto
│   │   │       │   ├── entity
│   │   │       │   └── repository
│   │   │       ├── infrastructure
│   │   │       ├── presentation
│   │   │       │   └── controller
│   │   │       └── services
│   │   └── infrastructure
│   │       ├── config
│   │       ├── database
│   │       │   ├── migration
│   │       │   └── seeds
│   │       └── web
│   │           ├── middleware
│   │           └── routes
│   └── tests
│       └── unit
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── lib
│   │   ├── pages
│   │   └── store
└── types (Shared types between backend and frontend)
    └── src
```
### Conclusion and Further Development
This TODO application project prioritizes maintainability, security, and a streamlined user experience. By adopting modern technologies and architectural patterns, it lays a solid foundation for future enhancements, and integrating more secure authorization mechanisms. The project's structure and choices reflect a commitment to best practices and efficient software development methodologies.
