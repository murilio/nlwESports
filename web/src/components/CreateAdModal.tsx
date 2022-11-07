import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check, GameController } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { IGameData } from '../@types'
import { Input } from './Form/Input'

type ModalGame<T extends IGameData> = Omit<T, 'bannerUrl' | '_count'>

const WEEKDAYS = [
  {
    value: 0,
    title: 'D'
  },
  {
    value: 1,
    title: 'S'
  },
  {
    value: 2,
    title: 'T'
  },
  {
    value: 3,
    title: 'Q'
  },
  {
    value: 4,
    title: 'Q'
  },
  {
    value: 5,
    title: 'S'
  },
  {
    value: 6,
    title: 'S'
  }
]

export const CreateAdModal = () => {
  const [games, setGames] = useState<ModalGame<IGameData>[]>([])
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(res => setGames(res))
  }, [])

  const handleCreateAd = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(data)
    console.log(formData)
    console.log(useVoiceChannel)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/50">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >
              <option disabled value="">Selecione o game que deseja jogar</option>

              {games.map(({ id, title }) => (
                <option key={id} value={id}>{title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Quando costuma jogar ?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-5 gap-2"
                value={selectedWeekDays}
                onValueChange={setSelectedWeekDays}
              >
                {/* <ToggleGroup.Item value="0" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('0') ? 'bg-violet-500' : ''} `}>D</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="1" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('1') ? 'bg-violet-500' : ''} `}>S</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="2" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('2') ? 'bg-violet-500' : ''} `}>T</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="3" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('3') ? 'bg-violet-500' : ''} `}>Q</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="4" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('4') ? 'bg-violet-500' : ''} `}>Q</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="5" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('5') ? 'bg-violet-500' : ''} `}>S</ToggleGroup.Item> */}
                {/* <ToggleGroup.Item value="6" className={`w-8 h-8 rounded bg-zinc-900 ${selectedWeekDays.includes('6') ? 'bg-violet-500' : ''} `}>S</ToggleGroup.Item> */}

                {WEEKDAYS.map(({ value, title }, index) => (
                  <ToggleGroup.Item
                    key={index}
                    value={`${value}`}
                    className={`w-8 h-8 rounded ${selectedWeekDays.includes(`${index}`) ? 'bg-violet-500' : 'bg-zinc-900'} `}>
                    {title}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hoursStart" name="hoursStart" type="time" placeholder="De" />
                <Input id="hoursEnd" name="hoursEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 p-1 rounded bg-zinc-900 "
              onCheckedChange={(checked) => {
                checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
            <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
