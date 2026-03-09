import {ActivityIndicator, Image, Text, View} from "react-native";

export const CustomSplashScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>
            <Image
                source={require('@/assets/images/android-icon-foreground.png')}
                style={{width: 100, height: 100, marginBottom: 20}}
                resizeMode="contain"
            />

            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                Загрузка приложения...
            </Text>

            <ActivityIndicator size="large" color="#0000ff"/>

            <Text style={{fontSize: 12, color: '#999', marginTop: 20}}>
                Пожалуйста, подождите
            </Text>
        </View>
    );
}