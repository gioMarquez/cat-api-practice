import { useEffect, useState } from "react"
import { Breeds } from "../../interfaces/Breeds"
import axios from "axios"
import { CustomSelect, ImagesGrid, Loader } from "../atoms"
import { Button } from "@mui/material"


const Gallery = () => {

    const [numberImages, setNumberImages] = useState(4)
    const [isLoading, setIsLoading] = useState(true)
    const [breeds, setBreeds] = useState<Breeds[]>([])
    const [selectedBreed, setSelectedBreed] = useState<string | undefined>(undefined)
    const [images, setImages] = useState<string[]>([])
    const [limit, setLimit] = useState(numberImages)

    const handleResize = () => {
        if (window.innerWidth < 768) {
            //isMobile
            setNumberImages(4)
        } else {
            setNumberImages(8)
        }
    }

    const addMoreImages = () => {
        setLimit((prevLimit) => prevLimit + numberImages)
    }

    const getBreeds = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/breeds');
            setBreeds(response.data);
        } catch (error) {
            console.error("Error", error)
        } finally {
            setIsLoading(false)
        }
    }



    const getImagesPerBreed = async (breedId: string) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=${100}`, {
                headers: {
                    'x-api-key': "live_T8pOvtC0C7zQfoQDMegnfv4ltbppLWOBN4wpcCAWd9ISc5PHTQoMhJsntzz7BLON"
                }
            });
            setImages(response.data.map((image: { url: string }) => image.url));
        } catch (error) {
            console.error("Error", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBreeds()
    }, [])

    useEffect(() => {
        if (selectedBreed) {
            getImagesPerBreed(selectedBreed)
            setLimit(numberImages)
        }
    }, [selectedBreed])

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])







    return (

        <div>
            {isLoading ? <Loader /> : null}
            {breeds.length ?
                <div className='pt-5'>
                    <CustomSelect
                        label='Seleccionar raza'
                        onChange={(value) => setSelectedBreed(value.toString())}
                        options={breeds.map((breed) => ({
                            label: breed.name,
                            value: breed.id
                        }))}
                    />

                    <>
                        <ImagesGrid images={images.slice(0, limit)} />
                        {limit < images.length ?
                            <div className='flex justify-center items-center pb-3'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addMoreImages}
                                    className='mt-5'
                                >
                                    Cargar más
                                </Button>
                            </div>
                            : <div className='flex justify-center items-center pb-3'>
                                {selectedBreed && <p className='text-gray-500'>No hay más imágenes</p>}
                            </div>
                        }
                    </>




                </div>
                : "no races"
            }


            {/* <Menu /> */}
        </div>
    )
}

export default Gallery