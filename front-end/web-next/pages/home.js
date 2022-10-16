import Head from 'next/head'
import Link from "next/link"
import { Middleware } from 'next/dist/lib/load-custom-routes'
import MenuBar from '../componenets/menubar'
import style from '../styles/homepage.module.css'
import Image from 'next/image'
import unitlogo from '../img/unitlogo.png'

const Home = () => {
    return <>
        <Head>
            <title>홈페이지</title>
        </Head>
        <div className = {style.unit}>
            <div style = {{marginTop: '30px', marginLeft: '15px'}}><Image width = {200} height = {240} src={unitlogo.src}/></div>
            <div>
            <p>수도방위사령부</p>

            </div>
            
        </div>
        <p>홈페이지</p>
    </>
}

//export async function getServerSideProps() {
    // Fetch data from external API
    //const res = await fetch(`https://.../data`)
    //const data = await res.json()
  
    // Pass data to the page via props
   // return { props:  'data' }
  //}

export default Home; 
