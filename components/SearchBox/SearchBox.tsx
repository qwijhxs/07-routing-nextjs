import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
    searchTextValue: string,
    onChange: (value: string) => void
}

export default function SearchBox({ searchTextValue, onChange }: SearchBoxProps) {
    const [query, setQuery] = useState<string>(searchTextValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    }

    const debouncedChange = useDebouncedCallback(() => {
        onChange(query);
    }, 300);

    useEffect(() => {
        debouncedChange();
    }, [debouncedChange, query, searchTextValue]);

    return (
        <input
            className={css.input}
            type="text"
            value={query}
            placeholder="Search notes"
            onChange={handleChange}
        />
    );
}