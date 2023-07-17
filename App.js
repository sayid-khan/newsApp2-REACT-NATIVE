import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View , Image, TouchableOpacity, SafeAreaView} from 'react-native';
import axios from 'axios'
import { Card } from 'react-native-paper';


let source = "bbc-news";
// let source = 'the-times-of-india'
let apiKey = "0e7504bf0db745c59da132db72aa21b1";

export default function App() {

  const [article, setArticle] = useState([])
  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`

  //method 1 to get articles
    const getArticles= ()=>{
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>setArticle(json))
    .catch((err)=>console.log(err))
  }

  // method 2 using async await 
        // const getArticles=async ()=>{
        //   try{
        //     const res =await axios.get(url)
        //     setArticle(res.data)
        //   }catch(error){
        //     console.log(error)
        //   }
        // }

  useEffect(() => {
    getArticles()
  }, [])
  

  return (
    <>
    {
      Object.keys(article).length > 0 && (

        <SafeAreaView style={styles.container}>
         <ScrollView>
            <StatusBar style="auto" />
            <Text style={{flex:1,marginLeft:130,marginBottom:10,fontSize:20,fontWeight:"bold",color:"#fff"}}>Breaking News</Text>
            {
              article.articles.map((article,index)=>(
                <Card key={index} style={{backgroundColor:"#36454F"}}>
                  <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection:"row",
                    marginVertical:15,
                  }}
                  >
                    <Text style={{fontSize:18,fontWeight:"500",flex:1,color:"white"}}>{article.title}</Text>
                    <TouchableOpacity>
                      <Image
                      source={{uri:article.urlToImage}}
                      style={{height:100,width:100,borderRadius:10}}
                      />
                    </TouchableOpacity>
                  </View>
                    <Text style={{fontSize:16,color:"white"}}>{article.description}</Text>
                    <Text style={{color:"white"}}>{article.publishedAt}</Text>
                </Card>
              ))
            }
         </ScrollView>
        </SafeAreaView>
      )
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color:"",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
