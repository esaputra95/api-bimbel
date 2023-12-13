import { PrismaClient } from '@prisma/client'

const Model = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
})

export default Model