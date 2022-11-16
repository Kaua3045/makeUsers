const Redis = require('ioredis')

const redis = new Redis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
  user: process.env.USER_REDIS,
  password: process.env.PASSWORD_REDIS,
  db: process.env.DATABASE_REDIS
})

const save = async (key, value) => {
  await redis.set(key, JSON.stringify(value))
}

const recover = async (key) => {
  const data = await redis.get(key)

  if (!data) {
    return null
  }

  const parsedData = JSON.parse(data)

  return parsedData
}

const invalidate = async (key) => {
  await redis.del(key)
}

const invalidatePrefix = async (prefix) => {
  const keys = await redis.keys(`${prefix}:*`)
  const pipeline = redis.pipeline()

  keys.forEach(key => {
    pipeline.del(key)
  })

  await pipeline.exec()
}

module.exports = {
  redis,
  save,
  recover,
  invalidate,
  invalidatePrefix
}