import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import Loading from '../pages/Loading/Loading';
import { Fade, Slide } from 'react-awesome-reveal';

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
                <Slide direction="down" triggerOnce duration={600}>
                    <Navbar />
                </Slide>
            </header>

            <main className='flex-grow'>
                <Fade cascade damping={0.2} triggerOnce>
                    <Outlet />
                </Fade>
            </main>

            <footer>
                <Slide direction="up" triggerOnce duration={600}>
                    <Footer />
                </Slide>
            </footer>

        </div>
    );
};

export default MainLayout;
