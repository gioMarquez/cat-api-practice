import { useEffect, useState } from "react";
import { Breeds } from "../../interfaces/Breeds";
import axios from "axios";
import { CustomSelect, ImagesGrid, Loader } from "../atoms";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Gallery = () => {
    const [numberImages, setNumberImages] = useState(4);
    const [isLoading, setIsLoading] = useState(true);
    const [breeds, setBreeds] = useState<Breeds[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string | undefined>(undefined);
    const [images, setImages] = useState<string[]>([]);
    const [limit, setLimit] = useState(numberImages);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // 👈 estado para el modal

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setNumberImages(4);
        } else {
            setNumberImages(8);
        }
    };

    const addMoreImages = () => {
        setLimit((prevLimit) => prevLimit + numberImages);
    };

    const getBreeds = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://api.thecatapi.com/v1/breeds");
            setBreeds(response.data);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getImagesPerBreed = async (breedId: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=100`,
                {
                    headers: {
                        "x-api-key": "live_T8pOvtC0C7zQfoQDMegnfv4ltbppLWOBN4wpcCAWd9ISc5PHTQoMhJsntzz7BLON",
                    },
                }
            );
            setImages(response.data.map((image: { url: string }) => image.url));
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBreeds();
    }, []);

    useEffect(() => {
        if (selectedBreed) {
            getImagesPerBreed(selectedBreed);
            setLimit(numberImages);
        }
    }, [selectedBreed]);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    useEffect(() => { //cerrar el modal al presionar "Escape"
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setPreviewImage(null);
            }
        };

        if (previewImage) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [previewImage]);

    return (
        <div>
            {isLoading ? <Loader /> : null}
            {breeds.length ? (
                <div className="pt-1">
                    <h1 className="text-2xl font-[600] text-center -translate-y-10">Galería de gatos</h1>
                    <CustomSelect
                        label="Seleccionar raza"
                        className="w-[90%] mx-auto mb-3"
                        onChange={(value) => setSelectedBreed(value.toString())}
                        options={breeds.map((breed) => ({
                            label: breed.name,
                            value: breed.id,
                        }))}
                    />

                    <>
                        <ImagesGrid
                            images={images.slice(0, limit)}
                            onImageClick={(imgUrl: string) => setPreviewImage(imgUrl)}
                        />

                        {limit < images.length ? (
                            <div className="flex justify-center items-center pb-3">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addMoreImages}
                                    className="mt-5"
                                    sx={{
                                        backgroundColor: "#FF6F61",
                                        color: "#FFFFFF",
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        borderRadius: "10px",
                                        padding: "8px 14px",
                                        "&:hover": { backgroundColor: "#FF4F41" },
                                    }}
                                >
                                    Cargar más
                                </Button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center pb-3">
                                {selectedBreed && <p className="text-gray-500">No hay más imágenes</p>}
                            </div>
                        )}
                    </>

                    {/* Modal de previsualización */}
                    {previewImage && (
                        <div
                            className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4"
                            onClick={() => setPreviewImage(null)}
                        >
                            <div
                                className="relative w-full max-w-3xl max-h-[90vh] flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Botón de cerrar */}
                                <button
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 z-10 hover:bg-black/80"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    <CloseIcon fontSize="small" />
                                </button>

                                {/* Imagen */}
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-md shadow-xl"
                                />
                            </div>
                        </div>
                    )}


                </div>
            ) : (
                "No hay razas disponibles"
            )}
        </div>
    );
};

export default Gallery;
