import { FastifyInstance } from "fastify"
import { ClientError } from "./err/client-error"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    console.log(error)

    if ((error as any).validation) {
        return reply.status(400).send({
            message: 'Invalid input data',
            errors: (error as any).validation
        })
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({ 
            message: 'Invalid input data',    
            errors: error.flatten().fieldErrors
        })
    }

    if (error instanceof ClientError) {
        return reply.status(400).send({ error: error.message })
    }

    return reply.status(500).send({ error: 'Internal Server Error' })
}
