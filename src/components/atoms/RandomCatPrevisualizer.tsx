import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const RandomCatPrevisualizer = () => {
    const [randomCat, setRandomCat] = useState<string | undefined>(undefined);

    const getRandomCatImage = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            setRandomCat(response.data[0].url);
        } catch (error) {
            console.error("Error fetching cat image:", error);
        }
    };

    return (
        <div className="bg-red-300 w-[100vw] h-[70vh] flex flex-col items-center justify-center">
            <Button
                variant="contained"
                color="primary"
                onClick={getRandomCatImage}
            >
                Random Cat
            </Button>

            <div className="mt-4 w-[300px] h-[300px] bg-gray-200 flex items-center justify-center">
                {randomCat ? (
                    <img
                        src={randomCat}
                        alt="Random Cat"
                        className="w-full h-full object-cover"
                    />
                ) : "push random cat"}
            </div>
        </div>
    );
};

export default RandomCatPrevisualizer;