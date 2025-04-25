import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { OptionMenu } from "../../interfaces/OptionsMenu";

interface MenuProps {
    options: OptionMenu[];
    setOption: React.Dispatch<React.SetStateAction<number>>
}

const Menu = ({ options, setOption }: MenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Detectar clics fuera del menú
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="z-50">
            {/* Desktop Menu */}
            <div className="hidden lg:flex bg-primary w-full h-[10vh] items-center justify-around">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="bg-white border-2 rounded-xl px-4 py-2"
                        onClick={() => {
                            setOption(option.id);
                            setIsOpen(false);
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary p-4 rounded-br-2xl w-[60px] h-[60px] flex items-center justify-center"
                >
                    <span className="text-white text-3xl">☰</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed top-0 left-0 bg-primary w-[70vw] h-[100vh] pt-[1vh] px-[5vw] z-50 rounded-r-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-3 text-white"
                            >
                                <CloseIcon />
                            </button>

                            <h1 className="text-white text-2xl font-semibold mb-4">
                                Menú
                            </h1>

                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    className="bg-secondary text-white font-semibold border-2 rounded-[2rem] h-[8vh] my-[2vh] flex items-center justify-start px-4 w-full"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setOption(option.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option.icon && <span className="mr-4">{option.icon}</span>}
                                    {option.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Menu;
