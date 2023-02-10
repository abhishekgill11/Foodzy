
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

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
