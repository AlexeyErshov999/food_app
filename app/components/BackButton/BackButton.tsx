import {Ionicons} from "@expo/vector-icons";
import {Button} from "@ui-kitten/components";
import {IBackButtonProps} from "@/app/components/BackButton/types";

export const BackButton = ({cb}: IBackButtonProps) => {
    return (
        <Button
            appearance={'ghost'}
            size={'large'}
            onPress={cb}
        >
            <Ionicons name="arrow-back"/>
            Назад
        </Button>
    )
}