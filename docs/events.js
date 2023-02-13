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
    format: 'date-time',
    example: '2023-02-07T13:46:16.168Z',
  },
  updatedAt: {
    type: 'string',
    format: 'date-time',
    example: '2023-02-07T13:46:16.168Z',
  },
  deletedAt: {
    type: 'string',
    format: 'date-time',
    example: null
  }
};

const exampleEventWithParticipants = {
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
    format: 'date-time',
    example: '2023-02-07T13:46:16.168Z',
  },
  updatedAt: {
    type: 'string',
    format: 'date-time',
    example: '2023-02-07T13:46:16.168Z',
  },
  deletedAt: {
    type: 'string',
    format: 'date-time',
    example: null
  },
  participants: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'int',
          example: 1
        },
        eventId: {
          type: 'int',
          example: 1
        },
        ratingMu: {
          type: 'double',
          example: 13.2
        },
        ratingSigma: {
          type: 'double',
          example: 2.0
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-02-07T13:46:16.168Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-02-07T13:46:16.168Z'
        },
        deletedAt: {
          type: 'string',
          format: 'date-time',
          example: null
        }
      },
    }
  }
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
  description: 'Error: Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: `Event with id 1 was not found`
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
  security: security,
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
  security: security,
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
  description: 'Retrieve one event with all its participants',
  operationId: 'getEvent',
  security: security,
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
            properties: exampleEventWithParticipants,
          },
        },
      },
    },
    '404': eventNotFound,
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
      description: 'Event updated successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: exampleEventObject,
          },
        },
      },
    },
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
    '404': eventNotFound,
    '500': internalServerError,
  },
};

const deleteEvent = {
  tags: ['Events'],
  description: 'Delete an event',
  operationId: 'deleteEvent',
  security: security,
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
    '201': {
      description: 'Event deleted successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: '',
              },
            },
          },
        },
      },
    },
    '404': eventNotFound,
    '500': internalServerError,
  },
};

export { createEvent, createEventBody, deleteEvent, getEvents, getEvent, updateEventBody, updateEvent };
