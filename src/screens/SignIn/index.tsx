import React, {useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import { StatusBar, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import {useAuth} from '../../hooks/auth';

import { Button } from '../../components/Button';
import theme from '../../styles/theme';

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form
   } from './styles';

import * as Yup from 'yup';


export function SignIn(){

    const { signIns } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');

    const navegation = useNavigation();

    function handleNewAccount() {
        navegation.dispatch(CommonActions.navigate('FirstStep'));
    }

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
                password: Yup.string()
                .required('A senha é obrigatória')
            });
    
            await schema.validate({email, password});

            signIns({email, password});
            Alert.alert('logado com sucesso');

        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação.',
                'Ocorreu um erro ao fazer login., verifique as credenciais')
            }
        }
        
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                    />
                    <Header>
                        <Title>Estamos{'\n'}Quase lá</Title>
                        <SubTitle>
                        Faça seu login para começarm {'\n'}
                        uma experiência incrível.
                        </SubTitle>
                    </Header>
                    <Form>
                        <Input 
                        iconName="mail"
                        placeholder="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                        />

                        
                        <InputPassword 
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPasword}
                            value={password}
                        />
                    </Form>

                    <Footer>

                        
                        <Button 
                        title="Login"
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                        />
                        <Button 
                        title="Criar conta Gratuita"
                        color= {theme.colors.background_secondary}
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                        light
                        />
                    </Footer>
                    
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}