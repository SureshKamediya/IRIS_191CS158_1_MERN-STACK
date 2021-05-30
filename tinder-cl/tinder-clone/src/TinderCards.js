import React, { useState,useEffect } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import axios from './axiosdb';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const req = await axios.get('/cards/tinder/cards');
            setPeople(req.data);
        }
        fetchData();
    }, []);
    const swiped = (direction, person) => {
        console.log("Removed, "+ person);
    }

    const outOfFrame = (person) => {
        console.log(person + " left the screen")
    }


    return (
        <div className="tinderCards">
            <div className="tinderCards__container">
                {people.map((person) =>{
                    return(
                        <TinderCard
                        className ="swipe"
                        key = {person.name}
                        preventSwipe = {["up","down"]}
                        onSwipe = {(dir) => swiped(dir, person.name)}
                        onCardLeftScreen = {() => outOfFrame(person.name)}
                        >
                        <div
                            style = {{ backgroundImage: `url(${person.url})`}}
                            className = "card" 
                        >
                            <h2>{person.name}</h2>
                        </div>
                        </TinderCard>
                    );
                })}
            </div>
        </div>
    )
}

export default TinderCards;
