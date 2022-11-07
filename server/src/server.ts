import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHoursString } from './utils/convertMinutesToHoursString';

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/games', async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games)
})

app.post('/games/:id/ads', async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId: id,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHourStringToMinutes(body.hoursStart),
      hoursEnd: convertHourStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).json(ad)
})

app.get('/games/:id/ads', async (req: Request, res: Response) => {
  const gameId = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const formatAds = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHoursString(ad.hoursStart),
      hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
    }
  })

  return res.json(formatAds)
})

app.get('/ads/:id/discord', async (req: Request, res: Response) => {
  const adId = req.params.id

  const ad = await prisma.ad.findUnique({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return res.json({
    discord: ad?.discord
  })
})

app.listen(3333, () => console.log('server running on port 3333'))
