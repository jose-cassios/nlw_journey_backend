import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";


export async function getActivities(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/activities', {
        schema: {
            params: z.object({
                tripId: z.string()
            })
        },
    }, async (request) => {

        const { tripId } = request.params

        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            select: {
                starts_at: true,
                ends_at: true,
            }
        })

        if (!trip) {
            throw new Error('Trip not found')
        }

        const activities = await prisma.activity.findMany({
            where: { trip_id: tripId },
            orderBy: { occurs_at: 'asc' },
        })

        const grouped: Record<string, typeof activities> = {}

        for (const activity of activities) {
            const date = dayjs(activity.occurs_at).format('YYYY-MM-DD')
            if (!grouped[date]) grouped[date] = []
            grouped[date].push(activity)
        }

        const difference = dayjs(trip.ends_at).diff(trip.starts_at, 'days')

        const result = Array.from({ length: difference + 1 }).map((_, index) => {
            const date = dayjs(trip.starts_at).add(index, 'days').format('YYYY-MM-DD')
            return {
                date,
                activities: grouped[date] ?? []
            }
        })

        return { activities: result }
    })
}