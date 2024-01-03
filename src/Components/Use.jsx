import React from 'react';
import { Link } from 'react-router-dom';

const Use = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src="https://i.ibb.co/Bwj1xD3/Liceria-Co.png" alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title rounded-full w-10 h-10 bg-green-600 p-3 shadow-2xl font-bold">1</h2>
                    <p>First of all you visit to the website</p>
                    <div className="card-actions justify-end">
                        <Link to='/' className="btn bg-yellow-200 border-none">Contact Solution</Link>
                    </div>
                </div>
            </div>

            <div className="card  bg-base-100 shadow-xl image-full">
                <figure><img src="https://i.ibb.co/Bwj1xD3/Liceria-Co.png" alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title rounded-full w-10 h-10 bg-green-600 p-3 shadow-2xl font-bold">2</h2>
                    <ol>
                        <li>Go to the add contact page</li>
                        <li>Add fill the form</li>
                        <li>Submit this form properly</li>
                    </ol>
                    <div className="card-actions justify-end">
                        <Link to='/addcontacts' className="btn bg-yellow-200 border-none">Add Contact</Link>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src="https://i.ibb.co/Bwj1xD3/Liceria-Co.png" alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title rounded-full w-10 h-10 bg-green-600 p-3 shadow-2xl font-bold">3</h2>
                    <p>Show your added contact on the All contacts Page</p>
                    <div className="card-actions justify-end">
                        <Link to='/contacts' className="btn bg-yellow-200 border-none">All Contacts</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Use;