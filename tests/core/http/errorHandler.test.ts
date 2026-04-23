import { Request, Response, NextFunction } from "express";

import { ApiError } from "~/core/http/ApiError";
import { errorHandler } from "~/core/http/errorHandler";

describe('errorHandler()', () => {

  it('Case: Api Error -> return statusCode, message, details', () => {
    // Mock response của Express
    const req = {} as Request
    const res = {
      status: jest.fn().mockReturnThis(), // mockReturnThis() cho phép chainable - gọi nối tiếp kiểu res.status(...).json(...)
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    // Tạo một instance ApiError với status là 400 (Bad Request)
    const error = ApiError.BadRequest('Invalid input', { field: 'email' })

    // Gọi errorHandler middleware
    errorHandler(error, req, res, next)

    expect(res.status).toHaveBeenLastCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid input',
      details: { field: 'email' }
    })
  })

  it('Case: Unhandled Error > return statusCode 500 Internal Server Error', () => {
    const req = {} as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    // Tạo một Error thuần từ Error của Javascript
    const error = new Error('Oops! Something went wrong')
    
    errorHandler(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Internal Server Error'
    })
  })

})
