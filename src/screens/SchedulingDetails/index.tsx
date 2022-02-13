import React, {useState, useEffect} from 'react';
import {
    Feather
} from '@expo/vector-icons';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Alert,  } from 'react-native';

import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';

import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { format } from 'date-fns';

import {api} from '../../services/api';

import {
 Container,
 Header,
 CarImages,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
 Footer
} from './styles';




interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails(){
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const {car, dates} = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    async function handleConfirmRental(){
        setLoading(true);
        const SchedulingByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...SchedulingByCar.data.unavailable_dates,
            ...dates
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        });

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(() => {
            navigation.dispatch(CommonActions.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro Alugado',
                message: `Agora é só \n alugar`,
                }))
        })
        .catch(() => { 
            setLoading(false);
            Alert.alert('Não foi possível confirmar o agendamento')
        });

    }
    function handleBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    },[])
    

    

return (
    <Container>
        <Header>
            <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
            <ImageSlider 
            imagesUrl={car.photos}
            />
         </CarImages>

         <Content>
             <Details>
                 <Description>                     
                     <Brand>{car.brand}</Brand>
                     <Name>{car.name}</Name>
                 </Description>
                 <Rent>
                     <Period>{car.period}</Period>
                     <Price>{car.price}</Price>
                 </Rent>
             </Details>

            <Accessories>
                {
                    car.accessories.map(accessory => (
                        <Accessory
                        key={accessory.type}
                        name={accessory.name}
                        icon={getAccessoryIcon(accessory.type)}
                        />
                    ))
                }
            </Accessories>

            <RentalPeriod>


                <CalendarIcon>
                    <Feather 
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />
                </CalendarIcon>
            
            <DateInfo>
                <DateTitle>DE</DateTitle>
                <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>
            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.text}
            />
            
            <DateInfo>
                <DateTitle>ATÉ</DateTitle>
                <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.text}
            />
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
         </Content>

         <Footer>
             <Button 
             title="Alugar agora"
             color={theme.colors.success}
             onPress={handleConfirmRental}
             //enabled={!loading}
             loading={loading}
             />
         </Footer>

               
    </Container>
    );
}