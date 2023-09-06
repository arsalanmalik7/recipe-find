import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";


const Recipe = () => {
    const [resp, setResp] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [title, setTitle] = useState([]);
    const [instruct, setInstruct] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {

        const recipeFinder = document.querySelector(".recipeFinder");

        recipeFinder.addEventListener("submit", (e) => {
            e.preventDefault();


            setTimeout(() => {
                const accessKey = 'ZTrnvYtkS1_BIhSQg9DypNwpsWXNuIc0jHu8j9VGF9s';
                const apiUrl = 'https://api.unsplash.com/photos/random';

                const headers = {
                    'Authorization': `Client-ID ${accessKey}`
                };
                const params = {
                    'query': `${e.target[0].value}`,
                }

                axios.get(apiUrl, { headers, params })
                    .then(response => {
                        setImage(response.data.urls.regular);
                        console.log(response.data.urls.regular)


                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

            }, 0);









            const query = `${e.target[0].value}`;
            const apiKey = '2KzXCOHiI3BbaewPQ1Uly6U4DUGLAPvYcJDcW3FD';
            const apiUrl = `https://api.api-ninjas.com/v1/recipe?query=${query}`;

            const headers = {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            };

            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: headers
            });

            axiosInstance.get('')
                .then(response => {
                    setResp(response.data);
                    setIngredients(response.data[0].ingredients);
                    setTitle(response?.data[0]?.title);
                    setInstruct(response?.data[0]?.instructions);
                    e.target[0].value = ""
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        })
    }, []);

    return (
        <>



            <form className="recipeFinder">
                <div className="input-group">
                    <input type="text" className="input" placeholder="Pizza..." autoComplete="off" />
                    <input className="button--submit" value="Search" type="submit" />
                </div>
            </form>


            {resp.length === 0 ? (<h1 className="notFound">Not Found</h1>)
                : (
                    <>
                        <div className="recipeContainer">
                            <img id="foodPic" src={image} alt={title} />
                            <h1 className="recipeTitle">{title}</h1>
                            <div className="recipeIngredients" >
                                <h2>Ingredients:</h2>
                                <div>{ingredients.split('|').map(ingredient => (<div key={ingredient}>{ingredient}</div>))}</div>
                            </div>
                            <div className="recipeIngredients">
                                <h2>Instructions:</h2>
                                <p>{instruct}</p>
                            </div>
                        </div>
                    </>
                )}

        </>
    )
};


export default Recipe