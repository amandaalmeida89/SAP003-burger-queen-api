import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the order endpoints:', () => {

  it('It should create a orderItem', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    const res = await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({ id: 1, OrderId: 1, ProductId: 1 });

  });

  it('It should not create a orderItem with incomplete parameters', (done) => {
    const orderItem = {
    }
    chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all orderItem', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const res = await chai.request(app)
      .get('/api/orderItem')
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    res.body.data.forEach(element => {
      element.should.have.property('OrderId');
      element.should.have.property('ProductId');
    });

  });

  it('It should get a particular orderItem', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const orderId = 1
    const res = await chai.request(app)
      .get(`/api/orderItem/${orderId}`)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200)
    res.body.data.should.have.property('OrderId')
    res.body.data.should.have.property('ProductId')
  })

  it('It should not get a particular orderItem with invalid id', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const orderId = 8888

    const res = await chai.request(app)
      .get(`/api/orderItem/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find OrderItem with the id ${orderId}`)
  })

  it('It should not get a particular orderItem with non-numeric id', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const orderId = 'aaa';

    const res = await chai.request(app)
      .get(`/api/orderItem/${orderId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')

  })

  it('It should update a orderItem', async () => {
    const productOne = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productOne)

    const productTwo = {
      name: 'Cafe',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productTwo)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const updatedorderitem = {
      id: orderItemId,
      ProductId: 2,
    }
    const orderItemId = 1

    const res = await chai.request(app)
      .put(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedorderitem)

    expect(res.status).to.equal(200)
    expect(res.body.data.OrderId).equal(updatedorderitem.OrderId)
    expect(res.body.data.ProductId).equal(updatedorderitem.ProductId)
  })

  it('It should not update a orderItem with invalid id', async () => {
    const productOne = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productOne)

    const productTwo = {
      name: 'Cafe',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productTwo)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const updatedorderitem = {
      id: orderItemId,
      ProductId: 2,
    }

    const orderItemId = 9999
    const res = await chai.request(app)
      .put(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedorderitem)

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find OrderItem with the id: ${orderItemId}`)
  })

  it('It should not update a orderItem with non-numeric id value', async () => {
    const productOne = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productOne)

    const productTwo = {
      name: 'Cafe',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productTwo)

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

    await chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order);

    const orderItem = {
      OrderId: 1,
      ProductId: 1
    };

    await chai.request(app)
      .post('/api/orderItem')
      .set('Accept', 'application/json')
      .send(orderItem);

    const updatedorderitem = {
      id: orderItemId,
      ProductId: 2,
    }

    const orderItemId = 'ggg'
    const res = await chai.request(app)
      .put(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedorderitem)

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should delete a orderItem', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }

    await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

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
  
      await chai.request(app)
        .post('/api/orders')
        .set('Accept', 'application/json')
        .send(order);
  
      const orderItem = {
        OrderId: 1,
        ProductId: 1
      };
  
     const orderItemResponse = await chai.request(app)
        .post('/api/orderItem')
        .set('Accept', 'application/json')
        .send(orderItem);

    const orderItemId = orderItemResponse.body.data.id;

    const res = await chai.request(app)
      .delete(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);

    const getOrderResponse = await chai.request(app)
      .get('/api/orderItem/' + orderItemId)
      .set('Accept', 'application/json')
      .send(orderItem);

    expect(getOrderResponse.status).to.equal(404);

  })

  it('It should not delete a orderItem with invalid id', async () => {
    const orderItemId = 777

    const res = await chai.request(app)
      .delete(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`OrderItem with the id ${orderItemId} cannot be found`)
  })

  it('It should not delete a order with non-numeric id', async () => {

    const orderItemId = 'bbb'
    const res = await chai.request(app)
      .delete(`/api/orderItem/${orderItemId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message').eql('Please provide a numeric value')
  })
})