import { useRouter } from "next/router";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";
import { SliderData } from "../components/SliderData";

export default function Homepage () {

    const route = useRouter();

    return (
        <Wrapper>
            <div>
                <h1>Welcome to my shop!</h1>
            </div>
            <div>
                <ImageSlider slides={SliderData}/>
                <button onClick={() => route.push("/")}>Begin shopping</button>
            </div>
        </Wrapper>
    )
}

const Wrapper= styled.div `
    margin: 3rem 0rem;
    button {
        color: white;
        background: var(--primary);
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1rem 2rem;
        cursor: pointer;
        position: relative;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
        margin-bottom: 3rem;
    }
    h1 {
        display: flex;
        justify-content: center;
    }
`;
