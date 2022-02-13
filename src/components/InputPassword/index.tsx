import React, {useState} from 'react';
import { TextInputProps } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';


import {
    Container,
    InputText,
    IconContainer
   } from './styles';


interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
    value?: string;
}

export function InputPassword({
    iconName,
    value,
    ...rest
    } : Props ){

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function handlePasswordVivisibilityChange() {
        setIsPasswordVisible(prevState => !prevState);
    }

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }
    

    const theme = useTheme();

    return (
        <Container>
            <IconContainer isFocused={isFocused}>

            <Feather
            name={iconName}
            size={24}
            color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
            />

            </IconContainer>
            
            <InputText 
            isFocused={isFocused}
            secureTextEntry={isPasswordVisible}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
            />
            
            <BorderlessButton onPress={handlePasswordVivisibilityChange}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    
                    size={24}
                    color={theme.colors.text_detail}
                    /> 
                </IconContainer>
            </BorderlessButton>
            
        </Container>
    );
}