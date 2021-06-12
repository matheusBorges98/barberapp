import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, RefreshControl } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

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

        LoadingIcon,
        ListArea
        
 } from './styles';

 import BarberItem from '../../components/BarberItem.js'

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () =>{
        setCoords(null);
        let result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        
        if(result === PermissionsAndroid.RESULTS.GRANTED){
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
                onRefresh();
                 getBarbers();
            });
        }
            

    };

    const getBarbers = async () =>{
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        
        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;
        }
        
        let res = await Api.getBarbers(lat, lng, locationText);
        console.log(res)
        
        if(res.error == ''){
            if(res.loc){
                console.log(res.loc)
               // res.loc = "Santa Catarina" Trabalhar na API proprietária para tratar dados.
                setLocationText(res.loc);
            }
            setList(res.data);

        }else{
            alert("Error: "+res.error);
        }

        setLoading(false);
    };
    
    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    return (
        <Container>
            <Scroller refreshControll={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
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
                        onEndEditing={handleLocationSearch}

                     />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>
                }
               
                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>


            </Scroller>
        </Container>
    );
}