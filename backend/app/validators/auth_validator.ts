import vine from '@vinejs/vine'

// Validator para login de usuário
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().minLength(8),
  })
)
