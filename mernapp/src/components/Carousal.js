
import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import "../Styles/RobinStyle.css"
import img1 from "../assets/pizza.png"
import img3 from "../assets/pizza1.png"
import img4 from "../assets/pizza3.png"
import img2 from "../assets/pizza_name.png"
import Carousel from 'react-bootstrap/Carousel';
function Carousal() {
  return (
   <div>
   <Carousel className='mb-5'>
   <Carousel.Item>
   <div className='home_page_section'>
   <Container>
   <Row>
   <Col lg={6} className='d-flex justify-content-center'>
   <div className='pizza_img '>
   <img src={img4} className="img-fluid " alt="pizza" />
   </div>
   </Col>
   
   <Col lg={6}>
   <div className='pizza_name_img'>
   
   <img src={img2} className="img-fluid " alt="pizza" />
   </div>
     <div className='button_box'>
     <div className='text-center '>
     <h1 >SUPER PROMO</h1>
     <p style={{color:"white"}} className='mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
     <p style={{color:"white"}}>Sed do eiusmodid est laborum.</p>
     </div>
     <div className='text-center'>
     <button className='order_now'> ORDER NOW</button>
     </div>
     
     </div>
   </Col> 
   </Row>
   
   </Container>
   
   </div>
     <Carousel.Caption>

     </Carousel.Caption>
   </Carousel.Item>
   <Carousel.Item>
   <div className='home_page_section'>
   <Container>
   <Row>
   <Col lg={6} className='d-flex justify-content-center'>
   <div className='pizza_img '>
   <img src={img3} className="img-fluid " alt="pizza" />
   </div>
   </Col>
   
   <Col lg={6}>
   <div className='pizza_name_img'>
   
   <img src={img2} className="img-fluid " alt="pizza" />
   </div>
     <div className='button_box'>
     <div className='text-center '>
     <h1 >SUPER PROMO</h1>
     <p style={{color:"white"}} className='mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
     <p style={{color:"white"}}>Sed do eiusmodid est laborum.</p>
     </div>
     <div className='text-center'>
     <button className='order_now'> ORDER NOW</button>
     </div>
     
     </div>
   </Col> 
   </Row>
   
   </Container>
   
   </div>
     <Carousel.Caption>
      
     </Carousel.Caption>
   </Carousel.Item>
   <Carousel.Item>
   <div className='home_page_section'>
   <Container>
   <Row>
   <Col lg={6} className='d-flex justify-content-center'>
   <div className='pizza_img '>
   <img src={img1} className="img-fluid " alt="pizza" />
   </div>
   </Col>
   
   <Col lg={6}>
   <div className='pizza_name_img'>
   
   <img src={img2} className="img-fluid " alt="pizza" />
   </div>
     <div className='button_box'>
     <div className='text-center '>
     <h1 >SUPER PROMO</h1>
     <p style={{color:"white"}} className='mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
     <p style={{color:"white"}}>Sed do eiusmodid est laborum.</p>
     </div>
     <div className='text-center'>
     <button className='order_now'> ORDER NOW</button>
     </div>
     
     </div>
   </Col> 
   </Row>
   
   </Container>
   
   </div>
     <Carousel.Caption>

     </Carousel.Caption>
   </Carousel.Item>
 </Carousel>    
    </div>
  )
}

export default Carousal



/* import React from 'react';

export default function Carousal() {
    return (
        <div className="carousel-container">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300x300?burger" className="d-block w-100" style={{ height: '600px', boxShadow: 'none' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300?ocean" className="d-block w-100" style={{ height: '600px', boxShadow: 'none' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300?momo" className="d-block w-100" style={{ height: '600px', boxShadow: 'none' }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button className='btn btn-outline-success text-white bg-success' style={{ zIndex: '1' }}>Search</button>
            </div>
        </div>
    );
}*/