
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateContact = () => {
    const { id } = useParams();
    console.log(id);

    const [product, setProduct] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/contacts')
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        const select = product.filter(p => p._id === id);
        setSelected(select);
        setIsLoading(false);
    }, [id, product])

    console.log(selected[0]);

    const handleUpdate = e => {
        e.preventDefault();

        const form = e.target;


        const name = form.name.value;
        const projectName = form.projectName.value;
        const description = form.description.value;


        const project = { name, projectName, description }

        console.log(project);

        fetch(`http://localhost:5000/contacts/${selected[0]?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your project has been Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.href = '/';
                }
            })
    }

    return (
        <div className='bg-base-200 p-10 md:w-3/4 w-full mx-auto shadow-2xl'>

            <h3 className="text-2xl font-semibold text-center mb-10">Update the Contact Info</h3>
            <div className='md:flex flex-row gap-5'>
                <div>
                    <img className='rounded-full w-[300px] lg:h-[220px] md:[150px]' src={selected[0]?.img} alt="" />
                    <h2 className='mt-4 text-2xl font-semibold text-blue-600'>{selected[0]?.name}</h2>
                </div>
                <form onSubmit={handleUpdate}>

                    <input type="text" name="name" placeholder="Project Name" className="input input-bordered w-full my-4" defaultValue={selected[0]?.name} required />

                    <input type="text" name="email" placeholder="Project Name" className="input input-bordered w-full my-4" defaultValue={selected[0]?.email} required />

                    <input type="text" name="phone" placeholder="Project Name" className="input input-bordered w-full my-4" defaultValue={selected[0]?.phone} required />

                    <input name="address" placeholder="Project Name" className="input input-bordered w-full my-4" required defaultValue={selected[0]?.address}></input>

                    <input type="submit" className="btn w-full bg-yellow-200" value="Update" />

                </form>
            </div>
        </div>
    );
};

export default UpdateContact;