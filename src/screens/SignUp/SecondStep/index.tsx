import React, { useState } from 'react';
import {KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Keyboard,
        Alert
} from 'react-native';
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { useTheme } from 'styled-components';

import {api} from '../../../services/api';

import {
 Container,
 Header,
 Steps,
 Title,
 SubTitle,
 Form,
 FormTitle
} from './styles';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SecondStep(){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const route = useRoute();
    const theme = useTheme();

    const navigation = useNavigation();
    

    const {user} = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if(!password || !passwordConfirm) {
            return Alert.alert('Informe a senha e a confirmação de senha!')
        }
        if(password != passwordConfirm) {
            return Alert.alert('As senhas não são iguais')
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password            
        })
        .then(() => {
            navigation.dispatch(CommonActions.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta Criada',
                message: `Agora é só \n fazer login`,
             }));
        })
        .catch(() => {
            Alert.alert('Opa', 'Não foi possível cadastrar');
        })

       
    }

return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
                <Steps>
                    <Bullet />
                    <Bullet active/>
                </Steps>
            </Header>

            <Title>
                Crie sua{'\n'}conta
            </Title>
            <SubTitle>
                Faça seu cadastro{'\n'}
                forma rápida e fácil
            </SubTitle>

            <Form>
                <FormTitle>2. Senha</FormTitle>
                <InputPassword 
                    iconName="lock"
                    placeholder="Senha"
                    onChangeText={setPassword}
                    value={password}
                />
                <InputPassword 
                    iconName="lock"
                    placeholder="Repetir Senha"
                    onChangeText={setPasswordConfirm}
                    value={passwordConfirm}
                />
                <Button
                    title="Cadastrar"
                    color={theme.colors.success}
                    onPress={handleRegister}
                />
            </Form>
        </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}