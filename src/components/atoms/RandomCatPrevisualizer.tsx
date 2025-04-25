import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import toast from "react-hot-toast";

const RandomCatPrevisualizer = () => {
    const [randomCat, setRandomCat] = useState<string | null>(null);
    const [catBreed, setCatBreed] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getRandomCatImage = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?limit=1&order=RAND&has_breeds=1`,
            {
                headers: {
                "x-api-key": "live_T8pOvtC0C7zQfoQDMegnfv4ltbppLWOBN4wpcCAWd9ISc5PHTQoMhJsntzz7BLON",
                },
            }
            );
            const catData = response.data[0];
            setRandomCat(catData?.url || null);
            setCatBreed(catData?.breeds?.[0]?.name || "Unknown Breed");
            toast.success("¡Raza obtenida!");
        } catch (err) {
            console.error("Error fetching cat image:", err);
            setError("Failed to fetch a random cat image. Please try again.");
            toast.error("Error fetching cat image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" w-full min-h-[70vh] flex flex-col items-center justify-center p-4">
            <p className="text-4xl font-semibold py-6 text-primary ">Razas Aleatorias 🙀</p>
            <div className="w-full max-w-sm rounded-2xl bg-blue-200 shadow-lg p-4 flex flex-col items-center justify-between gap-4">
                <div className="w-full aspect-square bg-gray-200 border border-gray-400 rounded-xl overflow-hidden flex items-center justify-center">
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <p className="text-red-500 text-center px-2">{error}</p>
                    ) : randomCat ? (
                        <img
                            src={randomCat}
                            alt="Random Cat"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-500 text-center px-2">Click "Random Cat" para cargar un imagen</p>
                    )}
                </div>
                {  !error && (
                    <p className="text-lg font-medium text-gray-700 text-center">
                        Raza: {!catBreed ? "---" : catBreed}
                    </p>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getRandomCatImage}
                    disabled={loading}
                    fullWidth
                    sx={{
                        borderRadius: "9999px",
                        fontWeight: 600,
                        textTransform: "none",
                        padding: "10px 0"
                    }}
                >
                    {loading ? "Loading..." : <div className="flex gap-2 text-xl"><ShuffleIcon /> Random Cat</div>}
                </Button>
            </div>
        </div>
    );
};

export default RandomCatPrevisualizer;
