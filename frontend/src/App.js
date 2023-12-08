import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Search from './components/Search.js';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome.js';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

// const UNSPLASH_KEY = '....' - WE DO NOT WANT TO PUT OUR KEY IN THE MAIN FILE. Put it in an environment file that will be ignored by git

const App = () => {
  const [word, setWord] = useState(''); //word is the variable, and setWord is the function we use to update the word variable
  const [images, setImages] = useState([]); //there are no images when the app starts, so there should be nothing in this array (images array), yet.

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }

    setWord('');
  };

  const handleDeleteImage = (id) => {
    //id is the id of each image from unsplash API, can be found in web pageconsole>components>State arrays
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
