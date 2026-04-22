import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "~/core/asyncHandler";

describe('asyncHandler()', () => {
  it('Calls next(error) when handler throws an error', async () => {
    // mock data và function
    const req = {} as Request
    const res = {} as Response
    // as known as something: kỹ thuật ép kiểu an toàn trong TS: double assertion
    const next = jest.fn() as unknown as NextFunction
    // tạo error
    const error = new Error('Something went wrong')
    // mock handle function
    const handleFunc = async () => {
      throw error // mục đích để chạy Promise.reject(error)
    }

    // gọi middleware asyncHandler 
    const middleware = asyncHandler(handleFunc as any)
    await middleware(req, res, next)

    // Kiểm tra xem next có được gọi với tham số error hay không
    expect(next).toHaveBeenCalledWith(error)
  })

  it ('Does nothing when handler resolves', async () => {
    const req = {} as Request
    const res = {} as Response
    const next = jest.fn() as unknown as NextFunction
    const handlerFunc = async () => {
      return 'ok'
    }
    // Gọi middleware asyncHandler
    await asyncHandler(handlerFunc as any)(req, res, next)
    // Không có lỗi -> sẽ ko gọi next(error)
    expect(next).not.toHaveBeenCalled()
  })
})