export default {
  type: "object",
  properties: {
    repository: { 
      type: 'object',
      properties: {
        name: { type: 'string' },
        owner: { 
          type: 'object',
          properties: {
            login: { type: 'string' }
          }
        },
      }
    },
    sender: { 
      type: 'object',
      properties: {
        login: { type: 'string'},
        id: { type: 'number'},
      } 
    },
  },
  required: ['repository', 'sender']
} as const;
