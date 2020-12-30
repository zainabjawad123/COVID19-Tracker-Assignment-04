import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, TouchableOpacity }from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useEffect } from 'react';
import { FlatList, ScrollList, ScrollView } from 'react-native-gesture-handler';

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

const countrylistOptions = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

const countrycovidoptions = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/report/country/name',
  params: {date: '2020-04-01', name: 'Italy'},
  headers: {
    'x-rapidapi-key': '1834ff89a0mshf82eb570998a029p1d7eaajsn4c302f5286c3',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

const Drawer = createDrawerNavigator();

const WorldScreen = ({navigation}) => {
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
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 100 , backgroundColor: 'lightgrey'}}>World population: {worldPopulation}</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15 , backgroundColor: 'lightgrey'}}>Percentage: {((covidTotal.confirmed / worldPopulation)*100).toFixed(2)} %</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center',marginTop:15, backgroundColor: 'lightgrey'}}>Confirmed: {covidTotal.confirmed}</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey'}}>Critical: {covidTotal.critical}</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey'}}>Deaths: {covidTotal.deaths}</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginTop:15, backgroundColor: 'lightgrey'}}>Recovered: {covidTotal.recovered}</Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center',marginTop:15, backgroundColor: 'lightgrey'}}>LastUpdated: {covidTotal.lastUpdate}</Text>
      
      </View>
}
</View>

    </SafeAreaView>
    </>
  );
};

const CountrylistScreen = ({navigation}) => {
  const [countrylist, setcountrylist]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.request(countrylistOptions).then(function (response) {
      setcountrylist(response.data.body.countries);
      console.log(countrylist);
    }).catch(function (error) {
        console.error(error);
      }).finally(() => setIsLoading(false));  
  }, [])

  return(
    
    <View>
      {isLoading ? <ActivityIndicator size="large" color="#c70039" />:
    <View>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 300}}>Country list :</Text>
        {/* <FlatList
            data={countrylist}
            keyExtractor={item => item}
            renderitem={({item} )=> (
                <Text>{item}</Text>
            )}
        /> */}
        <ScrollList>
            {
                countrylist.map((item) =>  {
                    return(
                        <TouchableOpacity key={item}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollList>
       

    </View>
}
    
    </View>
  )
  }
const CountryScreen = ({navigation,route }) => {
 
  const [Countrycovid,setCountrycovid]=useState([]);
  const [isLoading, setisLoading]=useState(true);

  useEffect (()=>{
    axios.request(countrycovidoptions).then(function (response) {
      setCountrycovid(...response.data);
      console.log(Countrycovid);
    }).catch(function (error) {
      console.error(error);
    }).finally (()=>setisLoading=(false))
  },[])
  
  
  return(
    <View>
      <Text>
        
      </Text>
    </View>
  )
}
const FavouriteScreen = ({navigation}) => {
  return(
    <View >
      <Text style={{textAlign: 'center' ,marginTop:300}}>
         avouriteScreen
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World">
        <Drawer.Screen name="World" component={WorldScreen} />
        <Drawer.Screen name="Countrylist" component={CountrylistScreen} />
        <Drawer.Screen name="favourite" component={FavouriteScreen} />
        <Drawer.Screen name="Country" component={CountryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
})