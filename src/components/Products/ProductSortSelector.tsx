import {useState} from "react";

const sortOptions = [
    {label: "Newest", value: "newest"},
    {label: "Name: A-Z", value: "a-z"},
    {label: "Name Z-A", value: "z-a"},
    {label: "Price: Low to High", value: "price-low-high"},
    {label: "Price: High to Low", value: "price-high-low"},
]

export const ProductSortSelector = ({ value, onChange }: {
    value: string;
    onChange: (val: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const selected = sortOptions.find(option => option.value === value);

    return (
        <div className="custom-select">
            <div className="selected" onClick={() => setOpen((prev) => !prev)}>
                <span>{selected ? selected.label : "Sort products"}</span>
                <span className="arrow">{open ? "▲" : "▼"}</span>
            </div>

            {open && (
                <ul className="dropdown">
                    {sortOptions.map(({ label, value: val }) => (
                        <li
                            key={val}
                            onClick={() => {
                                onChange(val);
                                setOpen(false);
                            }}
                            className={val === value ? "selected-option" : ""}
                        >
                            <span>{label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}