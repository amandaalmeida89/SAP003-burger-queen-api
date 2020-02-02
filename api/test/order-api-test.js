import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the order endpoints:', () => {

  it('It should create a order', async () => {
    const table = {
      number: "1"
    };

    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table);

    const order = {
      TableId: 1,
    };

    const res = await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({ id: 1, TableId: 1 });

  });

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

  it('It should get all orders', async () => {

    const table = {
      number: "1"
    }

    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const res = await chai.request(app)
      .get('/api/orders')
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    res.body.data[0].should.have.property('id');
    res.body.data[0].should.have.property('TableId');

  });

  it('It should get a particular order', async () => {
    const table = {
      number: "1"
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const order = {
      TableId: 1,
    }
    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)

    const orderId = 1
    const res = await chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200)
    res.body.data.should.have.property('id')
    res.body.data.should.have.property('TableId')

  })

  it('It should not get a particular order with invalid id', async () => {
    const table = {
      number: "1"
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const order = {
      TableId: 1
    }

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)

    const orderId = 8888

    const res = await chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Order with the id ${orderId}`)

  })

  it('It should not get a particular order with non-numeric id', async () => {
    const table = {
      number: "2"
    }

    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    const order = {
      TableId: 2,
    }

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)

    const orderId = 'aaa';

    const res = await chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')

  })

  it('It should update a order', async () => {
    const table = {
      number: "2"
    }

    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const order = {
      TableId: 2,
    }
    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    const updatedorder = {
      id: orderId,
      TableId: 3,
    }
    const orderId = 1

    const res = await chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedorder)

    expect(res.status).to.equal(200)
    expect(res.body.data.id).equal(updatedorder.id)
    expect(res.body.data.TableId).equal(updatedorder.TableId)
  })

  it('It should not update a order with invalid id', async () => {
    const table = {
      number: "5"
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const order = {
      TableId: 5,
    }
    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    const updatedorder = {
      TableId: 3,
    }

    const orderId = 9999
    const res = await chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedorder)

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Order with the id: ${orderId}`)
  })

  it('It should not update a order with non-numeric id value', async () => {
    const table = {
      number: "5"
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const order = {
      TableId: 1,
    }
    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
    const updatedorder = {
      id: orderId,
      TableId: 4,
    }

    const orderId = 'ggg'
    const res = await chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedorder)

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should delete a order', async () => {
    const table = {
      number: "2"
    }

    const tableResponse = await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table);

    const order = {
      TableId: tableResponse.body.data.id,
    };

    const orderResponse = await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)

    const orderId = orderResponse.body.data.id;

    const res = await chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);

    const getOrderResponse = await chai.request(app)
      .get('/api/orders/' + orderId)
      .set('Accept', 'application/json')
      .send(order);

    expect(getOrderResponse.status).to.equal(404);

  })

  it('It should not delete a order with invalid id', async () => {
    const orderId = 777

    const res = await chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Order with the id ${orderId} cannot be found`)
  })

  it('It should not delete a order with non-numeric id', async () => {

    const orderId = 'bbb'
    const res = await chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message').eql('Please provide a numeric value')
  })
})