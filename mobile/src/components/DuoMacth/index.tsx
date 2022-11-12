import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import { useState } from 'react'
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from "react-native"

import * as Clipboard from 'expo-clipboard'

import { THEME } from '../../theme'
import { Header } from '../Header'

import { styles } from "./styles"

interface Props extends ModalProps {
  discord: string
  onClose: () => {}
}

export const DuoMatch = ({ discord, onClose, ...rest }: Props) => {
  const [isCopy, setIsCopy] = useState(false)

  const handleCopyDiscordToClipBoard = async () => {
    setIsCopy(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discord copiado!', 'Discord copiado para a sua área de transferência')
    setIsCopy(false)
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType='fade'
      {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Header
            title="Let's play!"
            subtitle='Agora é só começar a jogar!'
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipBoard}
            disabled={isCopy}
          >
            <Text style={styles.discord}>
              {isCopy ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
