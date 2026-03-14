import {Stack} from "expo-router";
import {navigateBack} from "@/app/shared/utils";
import {BackButton} from "@/app/components/BackButton/BackButton";
import {View, Text} from "react-native";

export default function CartPage() {
    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <BackButton cb={navigateBack}/>
            <View>
                <Text>Cart</Text>
            </View>
        </>
    )
}