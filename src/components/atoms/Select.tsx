import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';


interface SelectOptions {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    label: string;
    options: SelectOptions[]
    onChange: (value: string | number) => void;
    className?: string;
}


const CustomSelect = ({ label, options, onChange, className }: CustomSelectProps) => {


    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        onChange(event.target.value as string);
    }



    return (
        <div className={className}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label={label}
                        onChange={handleChange}
                    >
                        {options.map((option: SelectOptions) => (
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}

export default CustomSelect
