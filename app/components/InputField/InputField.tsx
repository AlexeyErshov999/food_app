import React from 'react';
import {Input, Layout, Text} from "@ui-kitten/components";
import {IInputFieldProps} from "@/app/components/InputField/types";

export const InputField = ({
                               label,
                               value,
                               onChange,
                               keyboardType = 'numeric',
                               placeholder = '0',
                               flex = 1,
                               containerStyles,
                               inputLabelStyles,
                               inputStyles,
                           }: IInputFieldProps) => (
    <Layout style={[containerStyles, {flex, marginBottom: 0, paddingHorizontal: 0}]}>
        <Text category='c1' appearance='hint' style={inputLabelStyles}>
            {label}
        </Text>
        <Input
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            placeholder={placeholder}
            size='medium'
            style={inputStyles}
        />
    </Layout>
);