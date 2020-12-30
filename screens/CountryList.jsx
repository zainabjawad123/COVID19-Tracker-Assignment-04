import { NavigationHelpersContext } from '@react-navigation/native';
import React , {useState, useEffect}from 'react';
import { View, Text, Button, Stylesheet } from 'react-native';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';




const countrylistOptions = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/allcountriesname',
    headers: {
      'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
      'x-rapidapi-host': 'world-population.p.rapidapi.com'
    }
  };


  export default function CountryList({navigation}) {
    const [countriesName, setCountriesName] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.request(countrylistOptions).then(function (response) {
          setCountriesName(response.data.body.countries)
          // console.log(countriesName)
        }).catch(function (error) {
          console.error(error);
        }).finally(() => setIsLoading(false));
    
      }, [])


    
    return (
        <View>
         
            <FlatList
                data={countriesName}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress = {() => navigation.navigate('Country Stats', {name: item})}>
                    <Text style = {{fontSize: 25, marginTop: 10, marginHorizontal: 20,  backgroundColor: 'lightgray', padding: 10 , color: 'gray', textAlign: 'center'}}>{item}</Text>
                    </TouchableOpacity> 
                )}
            />
        </View>
    )
}