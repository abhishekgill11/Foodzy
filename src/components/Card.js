import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer.js';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    //const { _id, foodName, finalPrice, imgSrc } = props;
   // let foodItem = props.foodItems;
    const handleAddtoCart = async () =>
    {  let food = []
        for(const item of data) {
            if(item.id === props.foodItem._id) {
                food  = item;

                break;
            }
        }
        if(food!==[]){
            if(food.size === size) {
                await dispatch({ type: "UPDATE", _id: props.id, price: finalPrice, qty: qty})
                return
            }
            else if(food.size !== size){
                await dispatch({type:"ADD", _id:props.id, name:props.foodName, price: finalPrice, qty: qty, size: size, img: props.imgSrc })
                return 
            }
            return
        }
        await dispatch({type:"ADD", _id:props.id, name:props.foodName, price: finalPrice, qty: qty, size: size, img: props.imgSrc })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
        <div> 
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                {/* <p className="card-text">This is some imp text</p> */}
                <div className='container width-100'>
                    <select className='m-2 h-100  bg-success'onChange={(e)=> setQty(e.target.value)}>
                        {
                            Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}                    </select>
                    <select className='m-2 h-100 bg-success rounded' ref = {priceRef} onChange={(e)=> setSize(e.target.value)}>
                       {priceOptions.map((data)=>{
                        return <option key={data} value={data}>{data}</option>
                       })}
                    </select>
                    <div className='d-inline h-100 fs-5'>
                    ₹{finalPrice}/-
                    </div>
                </div>
                <hr/>
                <button className={'btn btn-success justift-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
            </div>
        </div>
    </div>
 </div>
    )
}
