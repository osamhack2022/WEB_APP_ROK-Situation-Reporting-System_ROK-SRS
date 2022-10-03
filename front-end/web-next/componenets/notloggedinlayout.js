import logo from '../img/logotransparent.png'
import Image from 'next/image'
import background from '../img/warbackground.jpg'
import styles from '../styles/notloggedinlayout.module.css'


const NotLoggedinLayout = ({children}) => {
    return (
        <>
        <div className={styles.container} style = {{
            backgroundImage: `url(${background.src})`,
            width: '100%',
            height: '100%',
            }}>
            <div id={styles.idcontainer}>
                <div id = {styles.logocontainer} style = {{marginTop: '25px', width: '600px'}}>
                    <Image id={styles.logo} src = {logo.src} width = '600px' height = '200px' style = {{margin: 'auto'}}/>
                </div>
                <div id = {styles.childcontainer}>
                    {children}
                </div>
            </div>
        </div>
        
        
        
        </>
    )
}
export default NotLoggedinLayout;