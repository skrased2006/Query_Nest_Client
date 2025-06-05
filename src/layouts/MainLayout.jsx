import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <header>
       <Navbar></Navbar>
            </header>
         <main className='flex-grow'>
    <Outlet></Outlet>
         </main>

         <footer>
  <Footer></Footer>
         </footer>
          
           
            
        </div>
    );
};

export default MainLayout;