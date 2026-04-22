import { ObjectId } from "mongodb";

import { objectIdToString } from "~/utils/objectIdToString";
/*
describe: gom các test case liên quan lại với nhau
it (test): tạo một test case đơn lẻ
expect: kiểm tra kết quả có đúng như mong đợi hay không
*/
describe('objectIdToString()', () => {
  it ('Should return correct 24-chars hex string from MongoDB Object', () => {
    const rawId = new ObjectId()
    const convertedId = objectIdToString(rawId)
    // toHexString() của MongoDB luôn trả về string 24 kí tự
    expect(convertedId).toBe(rawId.toHexString()) 

    // phải có 24 kí tự
    expect(convertedId).toHaveLength(24)

    // kết quả id của mongodb phải là chuẩn chữ thường và chữ số, KO CÓ KÍ TỰ ĐẶC BIỆT
    expect(convertedId).toMatch(/^[a-f0-9]{24}$/)
  })
})
