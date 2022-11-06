import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { FlatList, Image } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import logoIMG from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Header } from "../../components/Header";
import { styles } from "./styles";

export const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://10.0.0.108:3333/games')
      .then((response) => response.json())
      .then((res) => setGames(res))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoIMG}
          style={styles.logo}
        />

        <Header title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
        />

      </SafeAreaView>
    </Background>
  )
}
