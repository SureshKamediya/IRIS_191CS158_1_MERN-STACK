import axios from "axios";
import { useState } from "react";
import { Redirect, useParams } from "react-router";
import ConvNav from "../../Navbars/convnav";

const NewItem = () => {
    const {id} = useParams();
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects, setRedirects] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
         const item = {
            itemName : itemName,
            quantity: Number(quantity),
            club: id,
         };
         setIsPending(true);
         
        axios
        .post('http://localhost:8082/items/addItem', item)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This Item is added successfully");
                setIsPending(false);
                setRedirects(true);
            }
            else{
                console.log(res.data.message);
            }
        });
       
    }

    if(!redirects){
        return (  
            <div className="newitem">
                <ConvNav />
                <h2 className="mt-5 text-center">Add New Item</h2>
                <div className="container">               
                        <div className="row">
                            <div className="col-sm-8 mx-auto">
                                <div className="card colour2">
                                    <div className="card-body">
                                        <form onSubmit = {handleSubmit}>
                                            <div className="form-group">
                                                <label>Item Name</label>
                                                <input 
                                                    type = "text"
                                                    className = "form-control"
                                                    value = {itemName}
                                                    onChange = {(e) => setItemName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Quantity</label>
                                                <input 
                                                    type = "text"
                                                    className = "form-control"
                                                    value = {quantity}
                                                    onChange = {(e) => setQuantity(e.target.value)}
                                                /> 
                                            </div>
                                            
                                            {!isPending && <p className="mb-0 signcent"><button>Add Item</button></p>}
                                            {isPending && <button disabled>Adding Item</button>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
    else{
        return <Redirect to = "/dashboard/convener"></Redirect>
    }
}
 
export default NewItem;