import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import axios from "axios";

const countrycovidoptions = {
    method: 'GET',
    url: '',
    headers: {
      'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
      'x-rapidapi-host': ''
    }
  };

const CountryStats = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [countryStats, setCountryStats] = useState([]);
    const [countryName, setCountryName] = useState(route.params.name);


    useEffect(() => {

        axios.request({...countrycovidoptions, url: 'https://covid-19-data.p.rapidapi.com/country', params:{name: route.params.name}, headers: {...countrycovidoptions.headers, 'x-rapidapi-host': "covid-19-data.p.rapidapi.com"}}).then(function (response)
        { setCountryStats(...response.data)
              console.log(countryStats)
              // console.log('abcd')
              // console.log(...response.data)
          }).catch(function (error) {
              console.error(error);
          }).finally(() => setIsLoading(false));
      }, [])    
  
      return (
          <View style={styles.conatainer}>
          {isLoading? <ActivityIndicator color= "black" size="large" /> :
          <View style ={styles.details}>
              <Text style={styles.title} > {countryName}</Text>
              <Text style={styles.detail}>Confirmed: {countryStats.confirmed}</Text>
              <Text style={styles.detail}>Recovered: {countryStats.recovered}</Text>
              <Text style={styles.detail}>Critical: {countryStats.critical}</Text>
              <Text style={styles.detail}>Deaths: {countryStats.deaths}</Text>
              <Text style={styles.detail}>Last Updated: {countryStats.lastUpdate}</Text>
          </View>
          }
        </View>
      )
  }

  const styles = StyleSheet.create({
    title : {
      fontSize:30,
      textAlign: 'center',
      marginTop: 20
    },
    detail: {
      color: 'gray',
      backgroundColor: 'lightgray',
      padding: 10,
      margin: 5,
      borderRadius: 7,
      fontSize: 24,
      textAlign: 'center'
    },
    details: {
      marginHorizontal: 30
    }
})
export default CountryStats
