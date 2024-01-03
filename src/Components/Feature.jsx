import React from 'react';

// 
// 
// 
const Feature = () => {
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className="card bg-base-100 shadow-2xl">
                <figure><img className='h-[300px] w-full' src="https://i.ibb.co/wwtwGts/crud.jpg" alt="Curd" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Crud Operation</h2>
                </div>
            </div>

            <div className="card bg-base-100 shadow-2xl">
                <figure><img className='h-[300px] w-full' src="https://i.ibb.co/ZzGCJWf/responsive.jpg" alt="Responsive" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Responsive Design</h2>
                </div>
            </div>

            <div className="card bg-base-100 shadow-2xl">
                <figure><img className='h-[300px] w-full' src="https://i.ibb.co/TY631KF/light.jpg" alt="Curd" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Light & Dark Mode</h2>
                </div>
            </div>
        </div>
    );
};

export default Feature;