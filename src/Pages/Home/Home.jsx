import React from 'react';
import Banner from '../../Components/Banner';
import Use from '../../Components/Use';

const Home = () => {
    return (
        <div>
            <div className='mt-10'>
                <Banner />
            </div>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-yellow-600 mb-2">--- USE ---</p>
                <h3 className="text-3xl uppercase border-y-4 py-4">How Do You Use</h3>
            </div>
            <div className='my-10'>
            <Use/>
            </div>
        </div>
    );
};

export default Home;