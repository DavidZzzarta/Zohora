import app from "@src/core/app.js"
import request from 'supertest'
import { it, expect, describe } from 'vitest'

const mockApp = request(app())

describe('The unauthorized responses', () => {
  it('throws a 401 error when we trying to get information about a user', async () => {
    //WHEN
    const response = await mockApp
      .get('/auth')
      .set('Accept', 'Application/json')
    //THEN
    expect(response.status).toEqual(401)
  })

  it('throws a 401 error if we try get information regarding one transaction but we are not login', async () => {
    //WHEN
    const response = await mockApp
      .get('/transaction/id')
      .set('Accept', 'Application/json')
    //THEN
    expect(response.status).toEqual(401)
  })

  it('throws a 401 error if we try get information like the accounts but we are not login', async () => {
    //WHEN
    const response = await mockApp
      .get('/account')
      .set('Accept', 'Application/json')
    //THEN
    expect(response.status).toEqual(401)
  })
})

describe('The error responses', () => {
  it('fails because we need send a body of request', async () => {
    //WHEN
    const response = await mockApp
      .post('/auth/login')
      .set('Content-Type', 'Application/json')
    //THEN
    expect(response.status).toEqual(400)
  })
  it('fails because we need send a body of request', async () => {
    //WHEN
    const response = await mockApp
      .post('/auth/login')
      .set('Content-Type', 'Application/json')
      .send({
        email: 'some@example.com'
      })
    //THEN
    expect(response.status).toEqual(400)
  })
  it('fails because we need send a complete body of request to create a new user', async () => {
    //WHEN
    const response = await mockApp
      .post('/auth')
      .set('Content-Type', 'Application/json')
      .send({
        email: 'some@example.com',
        username: 'asdasd'
      })
    //THEN
    expect(response.status).toEqual(400)
  })
})
