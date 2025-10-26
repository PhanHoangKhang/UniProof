import React from 'react'
import Navbar from '../navbar/navbar'
import MainInfo from './MainInfo'
import Footer from '../footer/footer'
import { useEffect } from 'react'

const Home = () => {
  
 useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .fade-in-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
        <Navbar></Navbar>
        <div>
            <MainInfo></MainInfo>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Home