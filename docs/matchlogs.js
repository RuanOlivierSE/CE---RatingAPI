const exampleMatchlogObject = {
    id: {
        type: 'int',
        example: '123'
    },
    eventId: {
        type: 'int',
        example: '1'
    },
    teams: {
        type: 'array',
        items: {
            type: 'object',
            properties:{
                participants: {
                    type: 'array',
                    items: {
                        type: 'int',
                    },
                },
                score: {
                    type: 'int',
                }
            }
        },
        example: [{participants: [1, 2], score: 11},{participants: [3, 4], score: 3}]
    },
    higherIsBetter: {
        type: 'boolean',
        example: 'true'
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

const matchlogNotFound = {
    description: 'Resource not found',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Matchlog with id 1 was not found',
                    },
                },
            },
        },
    },
};

const invalidMatchlogData = {
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

const createMatchlogBody = {
    type: 'object',
    properties:
    {
        eventId: {
            type: 'int',
            example: '1'
        },
        higherIsBetter: {
            type: 'boolean',
            example: 'true'
        },
        teams: {
            type: 'array',
            items: {
                type: 'object',
                properties:{
                    participants: {
                        type: 'array',
                        items: {
                            type: 'int',
                        },
                    },
                    score: {
                        type: 'int',
                    }
                }
            },
            example: [{participants: [1, 2], score: 11},{participants: [3, 4], score: 3}]
        }
    },
};

const updateMatchlogBody = {
    type: 'object',
    properties:
    {
        id: {
            type: 'int',
            example: '123'
        },
        eventId: {
            type: 'int',
            example: '1'
        },
        teams: {
            type: 'array',
            items: {
                type: 'object',
                properties:{
                    participants: {
                        type: 'array',
                        items: {
                            type: 'int',
                        },
                    },
                    score: {
                        type: 'int',
                    }
                }
            },
            example: [{participants: [1, 2], score: 11},{participants: [3, 4], score: 3}]
        }
    },
};

const createMatchlog = {
    tags: ['Matchlogs'],
    description: 'Create a new matchlog. Once added to the DB, the ratings for relevant participants will be updated.',
    operationId: 'createMatchlog',
    security: security,
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createMatchlogBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Matchlog created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: exampleMatchlogObject,
                    },
                },
            },
        },
        '400': invalidMatchlogData,
        '500': internalServerError,
    },
};

const getMatchlog = {
    tags: ['Matchlogs'],
    description: 'Retrieve one matchlog on id.',
    operationId: 'getMatchlog',
    security: security,
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
            description: 'Matchlog retrieved successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: exampleMatchlogObject,
                    },
                },
            },
        },
        '404': matchlogNotFound,
        '500': internalServerError,
    },
};

const updateMatchlog = {
    tags: ['Matchlogs'],
    description: 'Update a matchlog. Note: the id in the body must coincide with the id in the request params',
    operationId: 'updateMatchlog',
    security,
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Matchlog ID',
            required: true,
            type: 'string',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/updateMatchlogBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Matchlog updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: exampleMatchlogObject,
                    },
                },
            },
        },
        '404': matchlogNotFound,
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

const deleteMatchlog = {
    tags: ['Matchlogs'],
    description: 'Delete a matchlog',
    operationId: 'deleteMatchlog',
    security: security,
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
            description: 'Matchlog deleted successfully!',
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
        '404': matchlogNotFound,
        '500': internalServerError
    },
};

export { createMatchlog, createMatchlogBody, deleteMatchlog, getMatchlog, updateMatchlogBody, updateMatchlog };
