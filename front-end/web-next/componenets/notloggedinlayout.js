import logo from '../img/logotransparent.png'
import Image from 'next/image'
import background from '../img/marpat2.jpg'
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
                <div id = {styles.logocontainer}>
                    <Image id={styles.logo} src = {logo.src} width = '450px' height = '150px'/>
                </div>
                {children}
            </div>
        </div>
        
        
        
        </>
    )
}
export default NotLoggedinLayout;