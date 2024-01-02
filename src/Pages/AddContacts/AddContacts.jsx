import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddContacts = () => {

    const key = import.meta.env.VITE_IMAGE_HOSTING
    const image_hosting_key = `https://api.imgbb.com/1/upload?key=${key}`;

    const [img, setImg] = useState('')
    const handleUpload = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(image_hosting_key, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image hosted successfully. URL:', data.data.url);
                setImg(data.data.url);
                return data.data.url;
            } else {
                throw new Error('Image hosting failed');
            }
        } catch (error) {
            console.error('Error hosting image:', error);
            return null;
        }
    };


    console.log(img);
    //console.log(handleUpload);
    const handleAddProject = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;


        if (!img) {
            console.log("Image upload in progress. Please wait.");
            Swal.fire({
                icon: 'success',
                title: 'Image upload in progress. Please wait.',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        const project = { name, email, phone, address, img }

        console.log(project);
        //send data 
        fetch('https://contacts-management-server.vercel.app/contacts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your contact info has been added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        e.target.reset();
    }
    return (
        <div>
            <div className="bg-base-200 p-10 md:w-1/2 w-full mx-auto shadow-2xl my-4 rounded-2xl">
                <h3 className="text-2xl font-semibold text-center mb-10">Add A Contact Info</h3>
                <form onSubmit={handleAddProject}>

                    <label>Profile Picture</label>
                    <br />
                    <input
                        type="file"
                        required
                        className="my-4"
                        accept="image/*"
                        onChange={handleUpload}
                    />

                    <br />
                    <label className=''>Your Name</label>
                    <br />

                    <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full my-4" required />

                    <label>Your Email</label>
                    <br />

                    <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full my-4" required />

                    <label>Your Phone Number</label>
                    <br />
                    <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full my-4" required />

                    <label>Your Address</label>
                    <br />
                    <input type="text" name="address" placeholder="Address" className="input input-bordered w-full my-4" required />


                    <input type="submit" className="btn w-full mt-4 bg-yellow-200" value="Add Contact" />

                </form>
            </div>
        </div>
    );
};

export default AddContacts;