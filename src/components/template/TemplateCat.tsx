import { OptionMenu } from "../../interfaces/OptionsMenu";
import { Menu } from "../atoms"
import Gallery from "../molecules/Gallery"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

const TemplateCat = () => {

    const options: OptionMenu[] = [
        { id: 1, label: "Random", icon: <ShuffleIcon /> },
        { id: 2, label: "Buscar por raza", icon: <LocationSearchingIcon /> },
    ];

    return (
        <div>
            <Menu options={options} />
            <Gallery />
        </div>
    )
}

export default TemplateCat