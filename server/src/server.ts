import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
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

app.post('/ads', (req: Request, res: Response) => {
  return res.status(201).json([])
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
      weekDays: ad.weekDays.split(',')
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

app.listen(3333)
