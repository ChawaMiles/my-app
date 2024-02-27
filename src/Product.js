import React , { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Product(){
    let id = useRef(null)
    let name = useRef(null)
    let price = useRef(null)
    let image = useRef(null)

    const [product,setProduct]=useState([])
    useEffect(()=>{
        console.log("request to api")
        axios.get("http://127.0.0.1:3000/products")
        .then(response=>setProduct(response.data))
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    },[product])

    let productList;
    if (Array.isArray(product)) {
        productList = product.map(p => (
            <li key={p._id}>
                ID :{p._id}
                <span> {p.name}</span>
                <img src={p.image}/> 
                {p.price}
                <button onClick={() => handleClickDelete(p._id)}>Delete</button>
            </li>
        ));
    } else {
        productList = []; 
    }

    const handleClickDelete = (id) => {
        axios.delete("http://127.0.0.1:3000/product/"+id)
            .then((response) => {
                setProduct(response.data)
            });
    };

    const handleClickADD = () => {
        const data={
            _id : id.current.value ,
            name : name.current.value,
            price : price.current.value,
            image : image.current.value,
        }
        axios.post("http://127.0.0.1:3000/product", data)
        .then((response) => {
            setProduct(response.data);
        });
    };

    const handleClickUpdate = () => {
        const data={
            _id : id.current.value ,
            name : name.current.value,
            price : price.current.value,
            image : image.current.value,
        }
        axios.put("http://127.0.0.1:3000/product/"+id.current.value, data)
        .then((response) => {
            setProduct(response.data);
        });
    };

    return (
        <div style={{display : "flex", justifyContent : "center", alignContent : "center", backgroundColor : "skyblue"}}>
            
            <div>
                <div style={{display : "grid",justifyItems : "center", alignContent : "center", width : 1000, height : 500, paddingTop : 100}}>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center", color : "white"}}>Enter ID</p>
                        <input ref={id} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center", color : "white"}}>Enter Name</p>
                        <input ref={name} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center", color : "white"}}>Enter Price</p>
                        <input ref={price} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center", color : "white"}}>Enter img (URL)</p>
                        <input ref={image} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50 , marginBottom : 15 }} type="text"/>
                    </form>
                    
                    <button onClick={handleClickADD} style={{width : 200, height : 50, fontSize : 30, borderRadius : 50 , marginBottom : 15, color  : "white", background : "blue"}}>ADD</button>
                    <button onClick={handleClickUpdate} style={{width : 200, height : 50, fontSize : 30, borderRadius : 50, color  : "white", background : "blue"}}>Update</button>


                </div>
                <ul style={{display : "grid", justifyContent : "center", alignContent : "center"}}>
                    {productList}
                </ul>
            </div>

        </div>)
}