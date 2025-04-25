
interface OptionMenu {
    id: number;
    label: string;
}

const Menu = () => {
    const options: OptionMenu[] = [
        { id: 1, label: "Opción 1" },
        { id: 2, label: "Opción 2" },
        { id: 3, label: "Opción 3" },
        { id: 4, label: "Opción 4" },
    ]


    return (
        <>
            <div className=" bg-green-300 w-[30vw] h-[100vh] pt-[1vh] px-[1vw]">
                {options.map((option: OptionMenu) => (
                    <div key={option.id} className="bg-white border-2 rounded-xl h-[8vh] my-[2vh] flex items-center justify-center">
                        {option.label}
                    </div>
                ))}
            </div>

        </>
    )
}

export default Menu