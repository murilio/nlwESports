import { Image, View } from "react-native";

import logoIMG from '../../assets/logo-nlw-esports.png';
import { Header } from "../../components/Header";
import { styles } from "./styles";

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoIMG}
        style={styles.logo}
      />

      <Header title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

    </View>
  )
}
