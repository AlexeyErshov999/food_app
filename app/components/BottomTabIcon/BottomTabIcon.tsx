import Ionicons from "@expo/vector-icons/build/Ionicons"
import { ComponentProps } from "react"
import { StyleProp, TextStyle } from "react-native"

type IconName = ComponentProps<typeof Ionicons>['name']

interface BottomTabIconProps {
  name: IconName
  style?: StyleProp<TextStyle>
  color?: string
  size?: number
}

export const BottomTabIcon = ({ name, style, color, size = 24 }: BottomTabIconProps) => {
    return (
        <Ionicons
            name={name}
            style={style}
            color={color || 'rgba(0, 0, 0, 0.3)'}
            size={size}
        />
    )
}