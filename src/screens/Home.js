
import React, { useEffect, useState } from 'react'
import Card from '../components/Card.js'
import Footer from '../components/Footer.js'
import Navbar from '../components/Navbar.js'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodmenu, setFoodmenu] = useState([]);


    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:4000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            response = await response.json();
            setFoodmenu(response[0]);
            setFoodCat(response[1]);
            // console.log(response[0],response[1])
        } catch (error) {
            console.log('There was a problem fetching the data: ', error);
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?cakes" className="d-block w-100" style={{ filter: "brightness(40%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?donuts" className="d-block w-100" style={{ filter: "brightness(40%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(40%" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                                <hr />
                                {foodmenu !== [] ? foodmenu.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                            <Card id={filterItems._id} foodName = {filterItems.name}
                                             options={filterItems.options[0]} imgSrc = {filterItems.img} ></Card>
                                        </div>
                                    )
                                })

                                    : <div>No such data found</div>}
                            </div>
                            )
                        }) : " "
                }

            </div>
            <div> <Footer /> </div>
        </div>
    )
}
