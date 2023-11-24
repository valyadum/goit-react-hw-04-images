import {useState} from 'react';
import { SearchbarStyle, SearchForm, SearchFormButton,  SearchFormInput } from './Searchbar.styled';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const onSearchBtn = (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      toast.error("Введи пошуковий запит!");
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <SearchbarStyle>
      <ToastContainer />
      <SearchForm onSubmit={onSearchBtn}>
        <SearchFormButton type="submit">
          <FaSearch />
        </SearchFormButton>

        <SearchFormInput
          className="input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
}


