import React, {useState} from 'react';
import * as Yup from 'yup';
import {KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Keyboard,
        Alert
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';



import {
 Container,
 Header,
 Steps,
 Title,
 SubTitle,
 Form,
 FormTitle
} from './styles';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function FirstStep(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }
    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().
                required('Nome é obrigatório'),
                email: Yup.string().
                required('Email é obrigatório').
                email('E-mail inválido'),
                driverLicense: Yup.string().
                required('CNH é obrigatória')

            });

            const data = {name, email, driverLicense};

            await schema.validate(data);

            navigation.dispatch(CommonActions.navigate('SecondStep', {user: data}));
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                return Alert.alert('Opa,', error.message);
            }
        }
        
    }

return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
                <Steps>
                    <Bullet active/>
                    <Bullet/>
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
                <FormTitle>1. Dados</FormTitle>
                <Input 
                    iconName="user"
                    placeholder="Nome"
                    onChangeText={setName}
                    value={name}
                />
                <Input 
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
                <Input 
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    onChangeText={setDriverLicense}
                    value={driverLicense}
                />
                <Button
                    title="Próximo"
                    onPress={handleNextStep}
                />
            </Form>
        </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}