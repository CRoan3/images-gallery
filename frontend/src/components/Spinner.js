import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const spinnerStyle = {
  position: 'absolute',
  top: 'calc(50% - 1rem)',
  left: '50%',
};

const Spinner = () => (
  <Loader style={spinnerStyle} animation="border" variant="primary" />
);

export default Spinner;
