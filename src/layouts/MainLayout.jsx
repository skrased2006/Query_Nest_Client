import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import Loading from '../pages/Loading/Loading';

const MainLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); 

      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return <Loading />;
    }
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