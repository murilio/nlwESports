
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

import { CreateAbBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { GamerBanner } from './components/GamerBanner'

import { IGameData } from './@types'
import logoImg from './assets/logo-nlw-esports.svg'

import axios from 'axios'
import './styles/main.css'

export const App = () => {
  const [games, setGames] = useState<IGameData[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(res => setGames(res.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ id, title, bannerUrl, _count }) => (
          <GamerBanner
            key={id}
            title={title}
            bannerUrl={bannerUrl}
            adsCount={_count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAbBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
