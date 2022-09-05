import {useQuery} from 'urql';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import {useRouter} from 'next/router';
import { DetailsStyle, ProductInfo, Quantity, Buy } from '../../styles/ProductDetails';
import {AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai';
import { useStateContext } from '../../lib/context';
import toast from "react-hot-toast";
import { useEffect } from 'react';

export default function ProductDetails() {
    //Use State
    const {qty, increaseQty, decreaseQty, onAdd, setQty} = useStateContext();
    console.log(qty)

    //Reset qty
    useEffect(() => {
        setQty(1);
    },[])

    //Fetch slug
    const {query} = useRouter();

    //Fetch Graphql data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug}
    })

    const {data, fetching, error} = results;

    //checking for data coming in
    if (fetching) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>

    //Extract data
    const {title, description, image} = data.products.data[0].attributes;

    //Create a toast
    const notify = () => {
        toast.success(`${title} added to cart`, {duration: 1500})
    };

    return (
        <DetailsStyle>
            <img src={image.data.attributes.formats.medium.url} alt={title} />
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
            
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={decreaseQty}><AiFillMinusCircle/></button>
                    <p>{qty}</p>
                    <button onClick={increaseQty}><AiFillPlusCircle/></button>
                </Quantity>
                <Buy onClick={() => {
                    onAdd(data.products.data[0].attributes,qty);
                    notify();
                    }}>Add to cart</Buy>
            </ProductInfo>
            
        </DetailsStyle>
    )
}