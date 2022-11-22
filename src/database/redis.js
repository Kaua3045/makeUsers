const Redis = require('ioredis')

const redis = new Redis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
  user: process.env.USER_REDIS,
  password: process.env.PASSWORD_REDIS,
  db: process.env.DATABASE_REDIS
})

const save = (key, value) => {
  redis.set(key, JSON.stringify(value))
}

const recover = async (key) => {
  const data = await redis.get(key)

  if (!data) {
    return null
  }

  const parsedData = JSON.parse(data)

  return parsedData
}

const recoverPrefix = async (prefix) => {
  const keys = await redis.keys(`${prefix}:*`)
  const pipeline = redis.pipeline()

  if (keys.length === 0) {
    return null
  }

  keys.forEach(key => {
    pipeline.get(key)
  })

  const result = await pipeline.exec()

  const parsedData = result.map(data => {
    if (data.length > 0) {
      return JSON.parse(data[1])
    }
  })

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
  recoverPrefix,
  invalidate,
  invalidatePrefix
}