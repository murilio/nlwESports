import { FlatList, Image, View } from "react-native";

import logoIMG from '../../assets/logo-nlw-esports.png';
import { GameCard } from "../../components/GameCard";
import { Header } from "../../components/Header";
import { GAMES } from "../../utils/games";
import { styles } from "./styles";

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoIMG}
        style={styles.logo}
      />

      <Header title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

      <FlatList
        contentContainerStyle={styles.contentList}
        data={GAMES}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <GameCard
            data={item}
          />
        )}
      />

    </View>
  )
}
