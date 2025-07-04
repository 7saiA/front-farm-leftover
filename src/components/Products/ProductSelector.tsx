import {useState} from "react";
import {productOptionsWithImages} from "../../utils/constants.ts";

const FarmProductSelector = ({ value, onChange }: {
    value: string;
    onChange: (val: string) => void;
}) => {
    const [open, setOpen] = useState(false);

    const selected = productOptionsWithImages.find(p => p.name === value);

    return (
        <div className="custom-select">
            <div className="selected" onClick={() => setOpen(prev => !prev)}>
                {selected ? (
                    <>
                        <img src={selected.image} alt={selected.name}/>
                        <span>{selected.name}</span>
                    </>
                ) : (
                    <span>Search Product</span>
                )}
                <span className="arrow">{open ? "▲" : "▼"}</span>
            </div>

            {open && (
                <ul className="dropdown">
                    <li
                        onClick={() => {
                            onChange(""); // "" = All Products
                            setOpen(false);
                        }}
                    >
                        <span style={{marginLeft: "0.5rem", fontWeight: "bold"}}>All Products</span>
                    </li>

                    {productOptionsWithImages.map(({name, image}) => (
                        <li
                            key={name}
                            onClick={() => {
                                onChange(name);
                                setOpen(false);
                            }}
                        >
                            <img src={image} alt={name}/>
                            <span>{name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FarmProductSelector;