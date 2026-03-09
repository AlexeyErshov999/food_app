import {KeyboardTypeOptions} from "react-native";

export interface IInputFieldProps {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
    flex?: 0 | 1;
    containerStyles?: { [key: string]: any };
    inputLabelStyles?: { [key: string]: any };
    inputStyles?: { [key: string]: any };
}