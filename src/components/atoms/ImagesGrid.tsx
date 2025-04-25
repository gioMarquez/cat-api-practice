interface GalleryProps {
    images: string[];
    onImageClick: (url: string) => void;
}

const ImagesGrid = ({ images, onImageClick }: GalleryProps) => {
    const imagesTotal = images.length;

    if (!images || imagesTotal === 0) {
        return <ImagesCounter length={imagesTotal} />;
    }



    return (
        <>
            <ImagesCounter length={imagesTotal} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.map((url, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg shadow-md">
                        <img
                            src={url}
                            alt={`Cat ${idx + 1}`}
                            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                            onClick={() => onImageClick(url)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ImagesGrid;


const ImagesCounter = ({ length }: { length: number }) => {

    return (
        <div className="fixed bottom-4 right-4 bg-primary/30 p-2 rounded-lg shadow-md border border-gray-300 ">
            Loaded: {length}
        </div>
    )
}
