import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => (
  <div className="container-fluid text-dark p-5">
    <div className="container bg-light p-5">
      <h1 className="display-10">Images Gallery</h1>
      <p>
        This is a simple application that retrieves photos using Unsplash API.
        To begin, enter any search term into the input field.
      </p>
      <Button bsstyle="primary" href="https://unsplash.com" target="_blank">
        Unsplash
      </Button>
    </div>
  </div>
);

export default Welcome;
