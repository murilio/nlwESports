import { Entypo } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RouteGameProps } from "../../@types/navigation"
import { Background } from "../../components/Background"

import logoImg from '../../assets/logo-nlw-esports.png'

import { useEffect, useState } from 'react'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { DuoMatch } from '../../components/DuoMacth'
import { Header } from '../../components/Header'
import { THEME } from "../../theme"
import { styles } from "./styles"

export const Game = () => {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as RouteGameProps

  useEffect(() => {
    fetch(`http://192.168.0.104:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((res) => setDuos(res))
  }, [])

  const handleGetDiscordUser = async (adsId: string) => {
    fetch(`http://192.168.0.104:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((res) => setDiscordDuoSelected(res.discord))
  }

  const handleBackPage = () => {
    navigation.goBack()
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPage}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />

          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => handleGetDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicado ainda.</Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={async () => setDiscordDuoSelected('')}

        />
      </SafeAreaView>
    </Background>
  )
}
