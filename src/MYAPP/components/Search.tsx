import React, { useState } from 'react';
import {SearchStyle} from "./Search.style";

interface IProps {
    handleSearchClick: any;
}

const Search: React.FC<IProps> = ({ handleSearchClick }) => {
    const [city, setCity] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCity(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleSearchClick(city);
    };

    return (
        <SearchStyle>
            <form onSubmit={handleSubmit} className="twitter-search-input">
                <svg viewBox="0 0 24 24">
                    <path
                        d="M15.7 14.3l6 6-1.4 1.4-6-6v-.9l-.3-.3a8 8 0 1 1 1.4-1.4l.3.3h.9zM4 10a6 6 0 1 0 12 0 6 6 0 0 0-12 0z"></path>
                </svg>
                <input type="text" placeholder="Search City..." value={city} onChange={handleInputChange}/>
            </form>
        </SearchStyle>
    );
};

export default Search;
