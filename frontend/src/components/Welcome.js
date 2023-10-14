import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => (
  <div class="container-fluid text-dark p-5">
    <div class="container bg-light p-5">
      <h1 class="display-10">Images Gallery</h1>
      <p>
        This is a simple application that retrieves photos using Unsplash API.
        To begin, enter any search term into the input field.
      </p>
      <Button bsStyle="primary" href="https://unsplash.com" target="_blank">
        Unsplash
      </Button>
    </div>
  </div>
);

export default Welcome;
