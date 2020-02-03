import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the product endpoints:', () => {
  it('It should create a product', (done) => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }
    chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          name: product.name,
          price: product.price,
          image: product.image,
          is_breakfast: product.is_breakfast,
          category: product.category
        })
        done()
      })
  })

  it('It should not create a product with incomplete parameters', (done) => {
    const product = {
      is_breakfast: true
    }
    chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all products', (done) => {
    chai.request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('name')
        res.body.data[0].should.have.property('price')
        res.body.data[0].should.have.property('image')
        res.body.data[0].should.have.property('is_breakfast')
        res.body.data[0].should.have.property('category')
        done()
      })
  })

  it('It should get a particular product', async () => {
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

    const ProductId = 1
    const res = await chai.request(app)
      .get(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(200)
    res.body.data.should.have.property('id')
    res.body.data.should.have.property('name')
    res.body.data.should.have.property('price')
    res.body.data.should.have.property('image')
    res.body.data.should.have.property('is_breakfast')
    res.body.data.should.have.property('category')

  })

  it('It should not get a particular product with invalid id', async () => {
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

    const ProductId = 8888
    const res = await chai.request(app)
      .get(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Product with the id ${ProductId}`)
  })

  it('It should not get a particular product with non-numeric id', async () => {
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

    const ProductId = 'aaa'

    const res = await chai.request(app)
      .get(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should update a product', async () => {
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

    const updatedProduct = {
      id: ProductId,
      name: 'Updated Awesome product',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'acompanhamento'
    }

    const ProductId = 1
    const res = await chai.request(app)
      .put(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)

    expect(res.status).to.equal(200)
    expect(res.body.data.id).equal(updatedProduct.id)
    expect(res.body.data.name).equal(updatedProduct.name)
    expect(res.body.data.price).equal(updatedProduct.price)
    expect(res.body.data.image).equal(updatedProduct.image)
    expect(res.body.data.is_breakfast).equal(updatedProduct.is_breakfast)
    expect(res.body.data.category).equal(updatedProduct.category)
  })

  it('It should not update a product with invalid id', async () => {
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

    const updatedProduct = {
      id: ProductId,
      name: 'Água 500ml',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'bebidas'
    }

    const ProductId = 9999
    const res = await chai.request(app)
      .put(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Product with the id: ${ProductId}`)
  })

  it('It should not update a product with non-numeric id value', async () => {
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

    const updatedProduct = {
      id: ProductId,
      name: 'Água 500ml',
      price: 10,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: true,
      category: 'bebidas'
    }

    const ProductId = 'ggg'
    const res = await chai.request(app)
      .put(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should delete a product', async () => {
    const product = {
      name: 'Água 500ml',
      price: 5,
      image: 'https://i.ibb.co/x5DZPQZ/agua-500ml.png',
      is_breakfast: false,
      category: 'bebidas'
    }
    const productResponse = await chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)

    const ProductId = productResponse.body.data.id;

    const res = await chai.request(app)
      .delete(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(200)
    expect(res.body.data).to.include({})
  })

  it('It should not delete a product with invalid id', async () => {
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

    const ProductId = 777

    const res = await chai.request(app)
      .delete(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Product with the id ${ProductId} cannot be found`)
  })

  it('It should not delete a product with non-numeric id', async () => {
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

    const ProductId = 'bbb'

    const res = await chai.request(app)
      .delete(`/api/products/${ProductId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message').eql('Please provide a numeric value')
  })
})