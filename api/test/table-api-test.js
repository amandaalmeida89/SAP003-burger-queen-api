import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the table endpoints:', () => {
  it('It should create a table', (done) => {
    const table = {
      number: "1"
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          number: "1"
        })
        done()
      })
  })

  it('It should not create a table with incomplete parameters', (done) => {
    const table = {
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all tables', (done) => {
    chai.request(app)
      .get('/api/tables')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('number')
        done()
      })
  })

  it('It should get a particular table', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = 1
    const res = await chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(200)
    res.body.data.should.have.property('id')
    res.body.data.should.have.property('number')
  })

  it('It should not get a particular table with invalid id', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = 8888

    const res = await chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Table with the id ${tableId}`)
  })

  it('It should not get a particular table with non-numeric id', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = 'aaa'

    const res = await chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should update a table', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    const updatedtable = {
      id: tableId,
      number: '2',
    }

    const tableId = 1

    const res = await chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedtable)

    expect(res.status).to.equal(200)
    expect(res.body.data.id).equal(updatedtable.id)
    expect(res.body.data.number).equal(updatedtable.number)
  })

  it('It should not update a table with invalid id', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    const updatedtable = {
      number: '3',
    }

    const tableId = '9999'

    const res = await chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedtable)

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Cannot find Table with the id: ${tableId}`)
  })

  it('It should not update a table with non-numeric id value', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
    const updatedtable = {
      id: tableId,
      number: '4',
    }
    const tableId = 'ggg'

    const res = await chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedtable)

    expect(res.status).to.equal(400)
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value')
  })

  it('It should delete a table', async () => {
    const table = {
      number: '1',
    }
    const tableIdResponse = await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = tableIdResponse.body.data.id;

    const res = await chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(200)
    expect(res.body.data).to.include({})
  })

  it('It should not delete a table with invalid id', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = '777'
    const res = await chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(404)
    res.body.should.have.property('message')
      .eql(`Table with the id ${tableId} cannot be found`)
  })

  it('It should not delete a table with non-numeric id', async () => {
    const table = {
      number: '1',
    }
    await chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)

    const tableId = 'bbb'
    const res = await chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    res.body.should.have.property('message').eql('Please provide a numeric value')
  })
})