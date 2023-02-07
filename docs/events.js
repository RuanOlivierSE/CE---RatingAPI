const exampleEventObject = {
  id: {
    type: 'int',
    example: '1',
  },
  name: {
    type: 'string',
    example: 'Annual Table Tennis Tournament 2023',
  },
  createdAt: {
    type: 'string',
    example: '2023-02-07T13:46:16.168Z',
  },
  updatedAt: {
    type: 'string',
    example: '2023-02-07T13:46:16.168Z',
  },
};

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal Server Error',
          },
        },
      },
    },
  },
};

const eventNotFound = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Event with id: "1" not found',
          },
        },
      },
    },
  },
};

const invalidEventData = {
  description: 'Invalid Data provided',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Bad request: ID should not be provided, since it is determined automatically by the database.',
          },
        },
      },
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const createEventBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Annual Table Tennis Tournament 2023',
    }
  },
};

const updateEventBody = {
  type: 'object',
  properties: {
    id: {
      type: 'int',
      example: '1',
    },
    name: {
      type: 'string',
      example: 'Annual Table Tennis Tournament 2023',
    },
  },
};

const createEvent = {
  tags: ['Events'],
  description: 'Create a new event',
  operationId: 'createEvent',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createEventBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Event created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: exampleEventObject,
          },
        },
      },
    },
    '400': invalidEventData,
    '500': internalServerError,
  },
};

const getEvents = {
  tags: ['Events'],
  description: 'Retrieve all the events',
  operationId: 'getEvents',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Events retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: exampleEventObject,
            },
          },
        },
      },
    },
    '500': internalServerError,
  },
};

const getEvent = {
  tags: ['Events'],
  description: 'Retrieve one event',
  operationId: 'getEvent',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Event ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'Event retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: exampleEventObject,
          },
        },
      },
    },
    //'404': eventNotFound,
    '500': internalServerError,
  },
};

const updateEvent = {
  tags: ['Events'],
  description: 'Update an event',
  operationId: 'updateEvent',
  security,
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Event ID',
      required: true,
      type: 'string',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updateEventBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Event retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: exampleEventObject,
          },
        },
      },
    },
    //'404': eventNotFound,
    '400': {
      description: 'Invalid Data provided',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Bad request: param ID does not match body ID.',
              },
            },
          },
        },
      },
    },
    '500': internalServerError,
  },
};

const deleteEvent = {
  tags: ['Events'],
  description: 'Delete an event',
  operationId: 'deleteEvent',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Event ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'Event deleted successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Event deleted successfully!',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { createEvent, createEventBody, deleteEvent, getEvents, getEvent, updateEventBody, updateEvent };
