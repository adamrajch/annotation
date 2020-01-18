import jwt from 'jsonwebtoken'


const token = (userId) => {
    return jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' })
}
export { token as default }