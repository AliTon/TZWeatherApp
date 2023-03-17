import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { SearchStyle } from './Search.style';

interface IProps {
    handleSearchClick: (city: string) => void;
    setCity: (city: string) => void;
}

type FormData = {
    city: string;
};

const Search: React.FC<IProps> = ({ handleSearchClick, setCity }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [previousValue, setPreviousValue] = useState<string>("");

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        if (data.city !== previousValue) {
            setPreviousValue(data.city);
            setCity(data.city);
            handleSearchClick(data.city);
        }
    };

    return (
        <SearchStyle>
            <form onSubmit={handleSubmit(onSubmit)} className="twitter-search-input">
                <svg viewBox="0 0 24 24">
                    <path d="M15.7 14.3l6 6-1.4 1.4-6-6v-.9l-.3-.3a8 8 0 1 1 1.4-1.4l.3.3h.9zM4 10a6 6 0 1 0 12 0 6 6 0 0 0-12 0z"></path>
                </svg>
                <Controller
                    control={control}
                    name="city"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <input type="text" placeholder="Search City..." {...field} />
                    )}
                />
                {errors.city && <span>Required field</span>}
                <button type="submit">Search</button>
            </form>
        </SearchStyle>
    );
};

export default Search;
