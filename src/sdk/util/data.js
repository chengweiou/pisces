export default {
  'POST /login': { token: 'alksdjfkljsadlf', refreshToken: 'aoivjioamweiwaopeif' },
  'POST /logout': true,
  'GET /me': { id: 1, type: 'SUPER', name: 'name', phone: 'phone', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },

  'POST /account': 4,
  'PUT /account/person/:personId': true,
  'GET /account/person/:personId': { id: 1, username: 'username', phone: 'phone', email: 'email', person: {id: 1}, active: true, extra: 'SUPER', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10'},
  'GET /account/username/check': true,

  'POST /person': 4,
  'DELETE /person': true,
  'PUT /person/:id': 4,
  'GET /person/:id': { id: 1, type: 'SUPER', name: 'name', phone: 'phone', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  'GET /person/count': 2,
  'GET /person': [
    { id: 1, type: 'SUPER', name: 'name', phone: 'phone', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 1, type: 'SUPER', name: 'name', phone: 'phone', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 1, type: 'SUPER', name: 'name', phone: 'phone', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],

  'POST /pet': 4,
  'DELETE /pet': true,
  'PUT /pet/:id': 4,
  'GET /pet/:id': { id: 1, person: {id: 1 }, name: 'name', type: 'DOG', age: 10, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  'GET /pet/count': 2,
  'GET /pet': [
    { id: 1, person: {id: 1 }, name: 'name', type: 'DOG', age: 10, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, person: {id: 1 }, name: 'name', type: 'CAT', age: 10, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, person: {id: 1 }, name: 'name', type: 'CAT', age: 10, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],
}
