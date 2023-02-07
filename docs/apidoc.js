const Events = require('./events.js');
const Roles = require('./matchlogs.js');

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '0.1',
    title: 'CE - Rating API Documentation',
    //description: 'Description of my API here',
    //termsOfService: 'https://mysite.com/terms',
    //contact: {
    //  name: 'Developer name',
    //  email: 'dev@example.com',
    //  url: 'https://devwebsite.com',
    //},
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Local Server',
    },
    // {
    //   url: 'https://api.mysite.com',
    //   description: 'Production Server',
    // },
  ],
  tags: [
    {
      name: 'Events',
    },
    {
      name: 'Matchlogs',
    },
    {
      name: 'Participants',
    },
  ],
  paths: {
    '/api/events': {
      post: Events.createEvent,
      get: Events.getEvents
    },
    '/api/events/{id}': {
      delete: Events.deleteEvent,
      get: Events.getEvent,
      put: Events.updateEvent,
    },
    // roles: {
    //   post: Roles.createRole,
    //   get: Roles.getRoles,
    // },
    // 'roles/{id}': {
    //   delete: Roles.deleteRole,
    //   get: Roles.getRole,
    //   put: Roles.updateRole,
    // },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
     schemas: {
       createEventBody : Events.createEventBody,
       updateEventBody : Events.updateEventBody,
    //   updateUserBody,
    //   createOrUpdateRoleBody,
     },
  },
};

module.exports = { apiDocumentation };
