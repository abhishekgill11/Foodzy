
import Card from '../components/Card.js'
import Carousal from '../components/Carousal.js'
import Footer from '../components/Footer.js'
import Navbar from '../components/Navbar.js'

export default function Home() {
    return (
        <div>
            <div> <Navbar /> </div>
            <div><Carousal/></div>
            <div>
                <Card />
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
