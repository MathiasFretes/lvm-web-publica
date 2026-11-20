import { View, StyleSheet } from 'react-native-web'

export function LinearGradient({ colors=[], locations, start={x:0,y:0}, end={x:0,y:1}, style, ...props }) {
  const angle = Math.atan2(end.x-start.x, -(end.y-start.y))*180/Math.PI
  const stops = colors.map((color,index)=>`${color}${locations?.[index] == null?'':` ${locations[index]*100}%`}`).join(',')
  return <View {...props} style={[StyleSheet.flatten(style), {backgroundImage:`linear-gradient(${angle}deg,${stops})`}]} />
}
