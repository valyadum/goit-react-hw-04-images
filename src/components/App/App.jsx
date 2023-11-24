import {  useEffect, useState } from "react";
import { AppContainer } from "./App.styled";
import ImageGallery from "../ImageGallery/ImageGallery";
import Searchbar from "../Searchbar/Searchbar";
import fetchApi from "../utils/imageAPI";
import Button from "../Button/Button";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [search, setSearch] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
   fetchApi(search, page).then(({ totalHits, hits }) => {
   if (totalHits === 0) {
     toast.error("По вашому запиту зображень не знайденно");
     return (setImage([]), setLoadMore(false), setIsLoad(false));
   }
     return (
       setImage(page === 1 ? hits :(prevImage=> [...prevImage, ...hits])),
       setLoadMore(page < Math.ceil(totalHits / 12)),
       setIsLoad(false)
     );
 }).catch(error=>(setError(error.message)))
  }, [search,page])
  
 const handleLoadMore = () => {
  setPage(page+1);
 };
  const onClickSearchbar = (search) => {
    setSearch(search);
    setPage(1);
    setIsLoad(true);
  };
   return (
     <AppContainer>
       <ToastContainer />
       <Searchbar onSubmit={onClickSearchbar} />
       {error && <h1>Ой помилка, щось пішло не так!</h1>}
       {image && <ImageGallery find={image} />}
       {loadMore && <Button onClick={handleLoadMore} />}
       {isLoad && <Loader />}
     </AppContainer>
   );
}

