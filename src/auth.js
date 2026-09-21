const SESSION_KEY = 'airbnb-session'

const encode = (value) => btoa(unescape(encodeURIComponent(JSON.stringify(value))))

export const createToken = (user) => `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ ...user, iat: Date.now() })}.demo-signature`

export const readToken = () => {
  try {
    const token = localStorage.getItem(SESSION_KEY)
    if (!token) return null
    const payload = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))))
    return payload.exp && payload.exp < Date.now() ? null : payload
  } catch {
    return null
  }
}

export const startSession = (user) => localStorage.setItem(SESSION_KEY, createToken({ ...user, exp: Date.now() + 1000 * 60 * 60 * 8 }))
export const endSession = () => localStorage.removeItem(SESSION_KEY)
