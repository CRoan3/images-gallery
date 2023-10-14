import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from 'C:/Users/Chris/Desktop/images-gallery/frontend/src/components/Header.js';
import Search from 'C:/Users/Chris/Desktop/images-gallery/frontend/src/components/Search.js';
import ImageCard from 'C:/Users/Chris/Desktop/images-gallery/frontend/src/components/ImageCard';
import Welcome from 'C:/Users/Chris/Desktop/images-gallery/frontend/src/components/Welcome.js';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY; // this variable will be used in splash request in unsplash API

// const UNSPLASH_KEY = '....' - WE DO NOT WANT TO PUT OUR KEY IN THE MAIN FILE. Put it in an environment file that will be ignored by git

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]); //there are no images when the app starts, so there should be nothing in this array (images array), yet.

  //console.log(images);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json()) //callback function that is executed when promise is resolved. here we call json method to res. res is passed to the callback function as an argument. it will also return the promsie, so we need to resolve it again
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]); //we put data in the beginning of the array because we want to the new data (image) to appear first. this will update array everytime an image is searched
      })
      .catch((err) => {
        //catch will be called in case promise is rejected (if there is an error during fetch request)
        console.log(err);
      });
    setWord('');
  };
  //(e.target[0].value) shows value of input of target (inspect > console > click the event > target)
  //console.log(word); gives us an updated state every time a key is pressed, not when it is searched - controlled state
  //console.log(process.env.REACT_APP_UNSPLASH_KEY); // this will show us process.env object in console of website. It will show us specifially our unplash key

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
