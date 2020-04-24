import React, {useState} from "react";
import {Carousel}  from 'react-bootstrap';
import special from '..//images/special.jpg';

const ControlledCarousel =() => {

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
      <div className="container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height="400"
            src={special}
            alt="First slide"
          />
          <Carousel.Caption>

            <h3> Croissant Day !</h3>
            <p> Enjoy your coffee with one free delicious croissant </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    );
  }

  
  export default ControlledCarousel;