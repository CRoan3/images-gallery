import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Search from './components/Search.js';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome.js';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from './components/Spinner.js';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

// const UNSPLASH_KEY = '....' - WE DO NOT WANT TO PUT OUR KEY IN THE MAIN FILE. Put it in an environment file that will be ignored by git

const App = () => {
  const [word, setWord] = useState(''); //word is the variable, and setWord is the function we use to update the word variable
  const [images, setImages] = useState([]); //there are no images when the app starts, so there should be nothing in this array (images array), yet.
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      toast('Saved images downloaded');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      getSavedImages();
    })();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New Image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(`Image ${images.find((i) => i.id === id).title.toUpperCase} was deleted.`)
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.insert_id) {
        setImages(
          images.map(
            (image) =>
              // eslint-disable-next-line prettier/prettier
            image.id === id ? { ...image, saved: true } : image
            // eslint-disable-next-line prettier/prettier
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
      </Container></>

    )}
    <ToastContainer position="bottom-right" />
    </div>
  );
};
  

export default App;
