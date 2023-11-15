/** Import module */
const request = require('supertest')
let server


describe('MAIN ROUTE', () => {

    beforeEach(() => {
        server = require('../server')
    })

    afterEach(() => {
        server.close()
    })

    describe('TRY GET', () => {
        
        it('Should return 200 ', async () => {
            const response = await request(server).get('/')
            expect(response.status).toBe(200)
        })

        it('Should return 501 ', async () => {
            const response = await request(server).get('/nimportequoi')
            expect(response.status).toBe(501)
        })
    })
})