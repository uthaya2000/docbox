# DocBox

DocBox is a file storage server built with NestJS, providing users with a secure and efficient platform for organizing and accessing their documents. Each user can create multiple docBoxes, each containing multiple documents that are only accessible to the docBox owner. This README provides an overview of the project, its features, technologies used, and potential extensions.

## Features

- **Secure Document Storage:** Utilizes AWS S3 for secure and reliable document storage, ensuring data integrity and confidentiality.
- **Multi-DocBox Support:** Users can create multiple docBoxes, each functioning as a separate container for documents.
- **Document Privacy:** Documents within a docBox are only accessible to the respective docBox owner, maintaining privacy.
- **API-driven Approach:** Offers a comprehensive API for seamless file storage and docBox management, enabling easy integration with other systems.
- **User Management:** Includes user management functionalities for creating, modifying, and deleting user accounts, ensuring proper access control.

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **AWS S3:** Secure cloud storage service used for document storage.
- **RESTful API:** Implements a RESTful API architecture for communication with external systems.
- **JWT Authentication:** Utilizes JSON Web Tokens (JWT) for secure authentication and authorization of API requests.
- **Prisma:** An Object-Relational Mapping (ORM) library for TypeScript and JavaScript, used for database management.
- **PostgreSQL:** SQL database used for storing user metadata, docBox configurations, and access controls.

## Usage

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/docbox.git`
2. Install dependencies: `npm install`
3. Configure AWS credentials and other environment variables.
4. Run the NestJS server: `npm run start`

## Potential Extensions

- **Collaborative DocBoxes:** Enable multiple users to collaborate within a docBox, supporting real-time document editing.
- **Advanced Search Functionality:** Implement advanced search capabilities for quick document retrieval.
- **Integration with Third-Party Services:** Integrate with popular productivity tools for document migration and synchronization.
- **Enhanced Security Measures:** Implement encryption-at-rest and access control lists (ACLs) for enhanced security.
- **Share Single Document:** Allow users to share individual documents with different user email IDs, enabling collaboration and access control on a per-document basis.
