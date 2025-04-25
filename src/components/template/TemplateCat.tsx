import { OptionMenu } from "../../interfaces/OptionsMenu";
import { Menu, RandomCatPrevisualizer } from "../atoms"
import Gallery from "../molecules/Gallery"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useState } from "react";

const TemplateCat = () => {
    const [option, setOption] = useState<number>(1);

    const options: OptionMenu[] = [
        { id: 1, label: "Random", icon: <ShuffleIcon /> },
        { id: 2, label: "Buscar por raza", icon: <LocationSearchingIcon /> },
    ];

    

    return (
        <div>
            <Menu options={options} setOption={setOption} />
            {option === 1 && <RandomCatPrevisualizer />}
            {option === 2 && <Gallery />}
            
        </div>
    )
}

export default TemplateCat