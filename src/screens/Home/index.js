import React, { useState } from 'react';
import { Platform } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import {Text} from 'react-native';
import { 
        Container,
        Scroller,

        HeaderArea,
        HeaderTittle,
        SearchButton,

        LocationArea,
        LocationInput,
        LocationFinder,
        
 } from './styles';

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoods] = useState(null);

    const handleLocationFinder = async () =>{
        setCoods(null);
        let result = await request(
            Platform.OS ==='ios'?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACESS_FINE_LOCATION
        );

        if(result == 'granted'){
            Geolocation.getCurrentPosition((info)=>{
                console.log(info);
            });
        }
            

    };
    
    return (
        <Container>
            <Scroller>
                
                <HeaderArea>
                    <HeaderTittle numberOfLines={2}> Encontre o seu barbeiro favorito </HeaderTittle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}

                     />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>



            </Scroller>
        </Container>
    );
}