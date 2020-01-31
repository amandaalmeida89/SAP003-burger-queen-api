// import chai from 'chai'
// import chatHttp from 'chai-http'
// import 'chai/register-should'
// import app from '../index'
// chai.use(chatHttp)
// const { expect } = chai

// describe('Testing the table endpoints:', () => {
//   it('It should create a table', (done) => {
//     const table = {
//       number: "1"
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//       .end((err, res) => {
//         expect(res.status).to.equal(201)
//         expect(res.body.data).to.include({
//           id: 1,
//           number: "1"
//         })
//         done()
//       })
//   })

//   it('It should not create a table with incomplete parameters', (done) => {
//     const table = {
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//       .end((err, res) => {
//         expect(res.status).to.equal(400)
//         done()
//       })
//   })

//   it('It should get all tables', (done) => {
//     chai.request(app)
//       .get('/api/tables')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200)
//         res.body.data[0].should.have.property('id')
//         res.body.data[0].should.have.property('number')
//         done()
//       })
//   })

//   it('It should get a particular table', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     const tableId = 1
//     chai.request(app)
//       .post('/api/tables')
//       .get(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200)
//         res.body.data[0].should.have.property('id')
//         res.body.data[0].should.have.property('number')
//         done()
//       })
//   })

//   it('It should not get a particular table with invalid id', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     chai.request(app)
//     const tableId = 8888
//       .get(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(404)
//         res.body.should.have.property('message')
//           .eql(`Cannot find Table with the id ${tableId}`)
//         done()
//       })
//   })

//   it('It should not get a particular table with non-numeric id', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     chai.request(app)
//     const tableId = 'aaa'
//       .get(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(400)
//         res.body.should.have.property('message')
//           .eql('Please input a valid numeric value')
//         done()
//       })
//   })

//   it('It should update a table', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     const updatedtable = {
//       id: tableId,
//       number: '2',
//     }
//     chai.request(app)
//     const tableId = 1
//       .put(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .send(updatedtable)
//       .end((err, res) => {
//         expect(res.status).to.equal(200)
//         expect(res.body.data.id).equal(updatedtable.id)
//         expect(res.body.data.number).equal(updatedtable.number)
//         done()
//       })
//   })

//   it('It should not update a table with invalid id', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     const updatedtable = {
//       number: '3',
//     }
//     chai.request(app)
//     const tableId = '9999'
//       .put(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .send(updatedtable)
//       .end((err, res) => {
//         expect(res.status).to.equal(404)
//         res.body.should.have.property('message')
//           .eql(`Cannot find Table with the id: ${tableId}`)
//         done()
//       })
//   })

//   it('It should not update a table with non-numeric id value', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     const updatedtable = {
//       id: tableId,
//       number: '4',
//     }
//     chai.request(app)
//     const tableId = 'ggg'
//       .put(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .send(updatedtable)
//       .end((err, res) => {
//         expect(res.status).to.equal(400)
//         res.body.should.have.property('message')
//           .eql('Please input a valid numeric value')
//         done()
//       })
//   })

//   it('It should delete a table', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     chai.request(app)
//     const tableId = '1'
//       .delete(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200)
//         expect(res.body.data).to.include({})
//         done()
//       })
//   })

//   it('It should not delete a table with invalid id', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     chai.request(app)
//     const tableId = '777'
//       .delete(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(404)
//         res.body.should.have.property('message')
//           .eql(`Table with the id ${tableId} cannot be found`)
//         done()
//       })
//   })

//   it('It should not delete a table with non-numeric id', (done) => {
//     const table = {
//       number: '1',
//     }
//     chai.request(app)
//       .post('/api/tables')
//       .set('Accept', 'application/json')
//       .send(table)
//     done()
//     chai.request(app)
//     const tableId = 'bbb'
//       .delete(`/api/tables/${tableId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(400)
//         res.body.should.have.property('message').eql('Please provide a numeric value')
//         done()
//       })
//   })
// })