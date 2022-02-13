import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import {Car} from '../../components/Car';
import {Load} from '../../components/Load';

interface CarProps {    
    id: string;
    user_id: string;    
    startDate: string;
    endDate:string;
    car: CarDTO;
}

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuant,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { Inter_500Medium } from '@expo-google-fonts/inter';



export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1')
                setCars(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    },[])

    const navigation = useNavigation();

    function handleBack(){
        navigation.goBack();
    }


    return(
        <Container>

            <Header>


                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleBack} color={theme.colors.shape}/>
                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            
            </Header>
            {loading ? <Load /> :
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                    <AppointmentsQuant>{cars.length}</AppointmentsQuant>
                </Appointments>

                <FlatList 
                data={cars}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <CarWrapper>
                    <Car data={item.car}/>
                    <CarFooter>
                        <CarFooterTitle>Período</CarFooterTitle>
                        <CarFooterPeriod>
                            <CarFooterDate>{item.startDate}</CarFooterDate>
                            <AntDesign 
                            name="arrowright"
                            size={20}
                            color={theme.colors.title}
                            style={{marginHorizontal: 10}}
                            />
                            <CarFooterDate>{item.endDate}</CarFooterDate>
                        </CarFooterPeriod>
                    </CarFooter>
                </CarWrapper>
                }
                />
            </Content>

            }

        </Container>
    )
}