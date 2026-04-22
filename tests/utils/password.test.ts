import { hashPassword, verifyPassword } from "~/utils/password";

describe('Password utils', () => {

  it ('hashPassword() should return a hash string password', async () => {
    // Tạo một cái hash password từ plain password
    const hash = await hashPassword('12345678a@')
    // Kiểm tra bcrypt hash string luôn phải khác với plain password string
    expect(hash).not.toBe('12345678a@')
    // Bcrypt thường sẽ bắt đầu bằng $2a$, $2b$, $2y$
    // expect(hash).toMatch(/^\$2[aby]$/)
    expect(hash).toMatch(/^\$2[aby]\$\d{2}\$.+/)
  })

  it ('verifyPassword() should be return true for correct password', async () => {
    const hash = await hashPassword('12345678a@')
    const isValid = await verifyPassword('12345678a@', hash)
    expect(isValid).toBe(true)
  })

  it ('verifyPassword() should be return false for wrong password', async () => {
    const hash = await hashPassword('12345678a@')
    const isValid = await verifyPassword('12345678', hash)
    expect(isValid).toBe(false)
  })

})