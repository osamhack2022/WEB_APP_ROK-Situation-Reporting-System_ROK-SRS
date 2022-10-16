import Head from 'next/head'
import Link from "next/link"
import { Middleware } from 'next/dist/lib/load-custom-routes'
import MenuBar from '../componenets/menubar'
import style from '../styles/homepage.module.css'
import {Image} from 'antd'
import unitlogo from '../img/unitlogo.png'

const Home = () => {
    return <>
        <Head>
            <title>홈페이지</title>
        </Head>
        <div className = {style.leftbar}>
            <div className = {style.user}>
                <div style = {{margin: 'auto', width: '160px', height: '160px'}}><Image width = {160} height = {160} src="https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67"/></div>
                <div style = {{marginTop: '10px', width: '160px', margin: 'auto'}}>
                    <span className={style.rank}>대위</span> <span className={style.name}>OOO</span> <br/>
                    <span className={style.role}>정보통신운용장교</span>
                </div>
                
            </div>
            <div className = {style.unit}>
                <p>소속부대</p>
                <div style = {{marginTop: '30px', marginLeft: '15px'}}><Image width = {160} height = {200} src={unitlogo.src}/></div>
                <div>
                <p>수도방위사령부</p>

                </div>
                
            </div>
        </div>
        <div className = {style.secondrow}>

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
