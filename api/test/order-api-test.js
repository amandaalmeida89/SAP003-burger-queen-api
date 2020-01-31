import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the order endpoints:', () => {
  it('It should create a order', (done) => {
    const table = {
      number: "1"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    done()
    const order = {
      TableId: 1,
    }
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 1,
          TableId: 1,
        })
        done()
      })
  })

  it('It should not create a order with incomplete parameters', (done) => {
    const order = {
    }
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all orders', (done) => {
    const table = {
      number: "1"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    done()
    chai.request(app)
      .get('/api/orders')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('TableId')
        done()
      })
  })

  it('It should get a particular order', (done) => {
    const table = {
      number: "1"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    done()
    chai.request(app)
    const order = {
      TableId: 1,
    }
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    done()
    chai.request(app)
    const orderId = 1
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('TableId')
        done()
      })
  })

  // it('It should not get a particular order with invalid id', (done) => {
  //   const table = {
  //     number: "1"
  //   }
  //   chai.request(app)
  //     .post('/api/tables')
  //     .set('Accept', 'application/json')
  //     .send(table)
  //   done()
  //   const order = {
  //     TableId: 1
  //   }
  //   chai.request(app)
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   chai.request(app)
  //   const orderId = 8888
  //     .get(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //         .eql(`Cannot find order with the id ${orderId}`)
  //       done()
  //     })
  // })

  it('It should not get a particular order with non-numeric id', (done) => {
    const table = {
      number: "2"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    done()
    chai.request(app)
    const order = {
      TableId: 2,
    }
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    done()
    chai.request(app)
    const orderId = aaa
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

  // it('It should update a order', (done) => {
  //   const table = {
  //     number: "2"
  //   }
  //   chai.request(app)
  //     .post('/api/tables')
  //     .set('Accept', 'application/json')
  //     .send(table)
  //   done()
  //   chai.request(app)
  //   const order = {
  //     TableId: 2,
  //   }
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   const updatedorder = {
  //     id: orderId,
  //     TableId: 3,
  //   }
  //   chai.request(app)
  //   const orderId = 1
  //     .put(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedorder)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200)
  //       expect(res.body.data.id).equal(updatedorder.id)
  //       expect(res.body.data.TableId).equal(updatedorder.TableId)
  //       done()
  //     })
  // })

  it('It should not update a order with invalid id', (done) => {
    const table = {
      number: "5"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    done()
    chai.request(app)
    const order = {
      TableId: 5,
    }
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    done()
    const updatedorder = {
      TableId: 3,
    }
    chai.request(app)
    const orderId = 9999
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedorder)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find order with the id: ${orderId}`)
        done()
      })
  })

  // it('It should not update a order with non-numeric id value', (done) => {
  //   const table = {
  //     number: "5"
  //   }
  //   chai.request(app)
  //     .post('/api/tables')
  //     .set('Accept', 'application/json')
  //     .send(table)
  //   done()
  //   chai.request(app)
  //   const order = {
  //     TableId: 1,
  //   }
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   const updatedorder = {
  //     id: orderId,
  //     TableId: 4,
  //   }
  //   chai.request(app)
  //   const orderId = ggg
  //     .put(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedorder)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message')
  //         .eql('Please input a valid numeric value')
  //       done()
  //     })
  // })

  // it('It should delete a order', (done) => {
  //   const table = {
  //     number: "2"
  //   }
  //   chai.request(app)
  //     .post('/api/tables')
  //     .set('Accept', 'application/json')
  //     .send(table)
  //   done()
  //   const order = {
  //     TableId: 1,
  //   }
  //   chai.request(app)
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   const deleteorder = {
  //     id: orderId,
  //     TableId: 1,
  //   }
  //   chai.request(app)
  //   const orderId = 1
  //     .delete(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .send(deleteorder)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200)
  //       expect(res.body.data.deletedAt).equal(deleteorder.deletedAt)
  //       done()
  //     })
  // })

  // it('It should not delete a order with invalid id', (done) => {
  //   const order = {
  //     TableId: '1',
  //   }
  //   chai.request(app)
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   chai.request(app)
  //   const orderId = '777'
  //     .delete(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //         .eql(`order with the id ${orderId} cannot be found`)
  //       done()
  //     })
  // })

  // it('It should not delete a order with non-numeric id', (done) => {
  //   const order = {
  //     TableId: '1',
  //   }
  //   chai.request(app)
  //     .post('/api/orders')
  //     .set('Accept', 'application/json')
  //     .send(order)
  //   done()
  //   chai.request(app)
  //   const orderId = 'bbb'
  //     .delete(`/api/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message').eql('Please provide a numeric value')
  //       done()
  //     })
  // })
})