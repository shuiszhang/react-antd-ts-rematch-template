export default {
  '/api/v1/table/query': {
    get: {
      enabled: true,
      response: {
        code: '0',
        data: {
          'records|10-20': [
            {
              id: '@string(10)',
              name: '@cword(3)',
              count: '@integer(1,100)',
              time: '@datetime',
              image: '@image(50x50)',
              status: '@boolean',
              email: '@email',
              ip: '@ip'
            }
          ],
          pagination: {
            current: 1,
            pageSize: 10,
            total: 30
          }
        }
      }
    }
  },
  '/api/v1/table/detail/:userId': {
    get: {
      enabled: true,
      response: {
        code: '0',
        data: {
          name: '@cword(3)',
          time: '@datetime',
          info1: '@paragraph(1,3)',
          info2: '@cparagraph(1,3)'
        }
      }
    }
  }
}
