import React, {useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, TouchableOpacity }from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const worldOptions = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/worldpopulation',
    headers: {
      'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
      'x-rapidapi-host': 'world-population.p.rapidapi.com'
    }
  };

  const covidOptions = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
      'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
  };

const WorldStats = ({navigation}) => {
    const [worldPopulation, setWorldPopulation] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [covidTotal, setCovidTotal] = useState([]);
  
    useEffect(() => {
      axios.request(worldOptions).then(function (response) {
        setWorldPopulation(response.data.body.world_population);
        console.log(worldPopulation);
      }).then(() => {
        axios.request(covidOptions).then(function (response) {
          setCovidTotal(...response.data)
          console.log(covidTotal);
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(function (error) {
        console.error(error);
      }).finally(() => setIsLoading(false));
  
    }, [])
  
    return(
      <>
      <StatusBar barStyle="auto" />
          <SafeAreaView>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                  <TouchableOpacity style={styles.drawerToggler} onPress={()=>navigation.toggleDrawer()}>
                      <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', position: 'relative', marginLeft:4 ,right: 1, top: 10}}>MENU</Text>
                  </TouchableOpacity>
                  <View style={{width: 300, alignItems:'center'}}>
                      <Text style={{ fontSize: 25, textAlign: 'center', color: "black",marginBottom:10, marginTop:25}}>Covid-19 STATS</Text>
                  </View>
              </View>    
              <View style={{backgroundColor: 'grey'}}>
                  <Text style={{ fontSize: 30, textAlign: 'center', color: 'white'}}>World Statistics</Text>
              </View>
      <View>
        {isLoading?<ActivityIndicator color="red" size="large"/>:
        <View style={{backgroundColor: "white"}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 100 , backgroundColor: 'lightgrey', padding: 10}}>World population: {worldPopulation}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15 , backgroundColor: 'lightgrey', padding: 10}}>Percentage: {((covidTotal.confirmed / worldPopulation)*100).toFixed(2)} %</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center',marginTop:15, backgroundColor: 'lightgrey', padding: 10}}>Confirmed: {covidTotal.confirmed}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey', padding: 10}}>Critical: {covidTotal.critical}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey', padding: 10}}>Deaths: {covidTotal.deaths}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey', padding: 10}}>Recovered: {covidTotal.recovered}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center',marginTop:15, backgroundColor: 'lightgrey' , padding: 10}}>LastUpdated: {covidTotal.lastUpdate}</Text>
        
        </View>
  }
  </View>
  
      </SafeAreaView>
      </>
    );
  };

export default WorldStats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
})
