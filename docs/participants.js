const exampleParticipantObject = {
    id: {
        type: 'int',
        example: '321'
    },
    eventId: {
        type: 'int',
        example: '1'
    },
    ratingMu: {
        type: 'double',
        example: '13.2'
    },
    ratingSigma: {
        type: 'double',
        example: '2.0'
    },
    createdAt: {
        type: 'string',
        example: '2023-02-07T13:46:16.168Z',
    },
    updatedAt: {
        type: 'string',
        example: '2023-02-07T13:46:16.168Z',
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

const participantNotFound = {
    description: 'Resource not found',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Participant with id: "1" not found',
                    },
                },
            },
        },
    },
};

const invalidParticipantData = {
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

const createParticipantBody = {
    type: 'object',
    properties:
    {
        eventId: {
            type: 'int',
            example: '1'
        },
    },
};

const createParticipant = {
    tags: ['Participants'],
    description: 'Create a new Participant.',
    operationId: 'createParticipant',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createParticipantBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Participant created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: exampleParticipantObject,
                    },
                },
            },
        },
        '400': invalidParticipantData,
        '500': internalServerError,
    },
};

const getParticipant = {
    tags: ['Participants'],
    description: 'Retrieve one participant on id.',
    operationId: 'getParticipant',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Participant ID',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Participant retrieved successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: exampleParticipantObject,
                    },
                },
            },
        },
        //'404': participantNotFound,
        '500': internalServerError,
    },
};

const deleteParticipant= {
    tags: ['Participants'],
    description: 'Delete a participant',
    operationId: 'deleteParticipant',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Matchlog ID',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Participant deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Partcipant deleted successfully!',
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

const getAllParticipantsByEvent = {
    tags: ['Participants'],
    description: 'Retrieve all participants for a specific event.',
    operationId: 'getParticipantsByEvent',
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
            description: 'Participant retrieved successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: exampleParticipantObject,
                        },
                      },
                },
            },
        },
        //'404': participantNotFound,
        '500': internalServerError,
    },
};

export { createParticipant, createParticipantBody, deleteParticipant, getParticipant, getAllParticipantsByEvent };
