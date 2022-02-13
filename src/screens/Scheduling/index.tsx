import React, {useState} from 'react';
import {useNavigation, CommonActions,useRoute} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { 
    Calendar,
    DayProps,
    generateInterval,
    MarkedDateProps
} from '../../components/Calendar';

import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Footer,
} from './styles';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: String;
}

interface Params {
    car: CarDTO;
}

export function Scheduling(){
    const [lastSelectedDate, setlastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();

    const navigation = useNavigation();

    const route = useRoute();
    const {car} = route.params as Params;

    function handleConfirmRental(){
            navigation.dispatch(CommonActions.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates),
            }));
        
    }
    function handleBack(){
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }
        setlastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })

    }

return (
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

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormatted}>
                        {rentalPeriod.startFormatted}
                    </DateValue>
                </DateInfo>
                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>
                    {rentalPeriod.endFormatted}
                    </DateValue>
                </DateInfo>
                
                
            </RentalPeriod>
            
        </Header>


        <Content>
            <Calendar 
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            
            />

        </Content>

        <Footer>
            <Button
            title="Confirmar"
            onPress={handleConfirmRental}
            enable={!!rentalPeriod.startFormatted}
            />
        </Footer>

    </Container>
    );
}