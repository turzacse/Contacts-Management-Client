
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdBrowserUpdated } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";




const AllContacts = () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetch('https://contacts-management-server.vercel.app/contacts')
            .then(res => res.json())
            .then(data => {
                setProject(data);
            })
    }, [])

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://contacts-management-server.vercel.app/contacts/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your contact info has been deleted.',
                                'success'
                            )
                            const remain = project.filter(cart => cart._id !== _id);
                            console.log(remain);
                            setProject(remain);
                        }
                    })
            }
        })
    }
    const handleMenuSelection = (_id, selectedOption) => {
        if (selectedOption === "update") {
          window.location.href = `/updatecontact/${_id}`;
        } else if (selectedOption === "delete") {
          handleDelete(_id);
        }
      };

    console.log(project);
    return (
        <>
            <Helmet>
                <title>All Contacts</title>
            </Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <h3 className="text-3xl uppercase border-y-4 py-4">All of My Contacts</h3>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {
                    project.map(item => <div className="" key={item.id}>
                        <div className="">

                            <div className="card-compact bg-base-100 shadow-xl">

                                <figure><img className="shadow-2xl h-[200px] w-1/2 mx-auto rounded-xl" src={item.img} alt="profile image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Name: {item.name}</h2>
                                    <div className="flex gap-5">
                                        <h2 className=""><span className="font-bold">Phone</span> : {item.phone}</h2>
                                        <h2><span className="font-bold">Email</span> : {item.email}</h2>
                                    </div>
                                    <h2><span className="font-bold">Address</span> : {item.address}</h2>
                                    {/* <div className="card-actions justify-evenly">

                                        <Link to={`/updatecontact/${item._id}`} className="btn bg-yellow-200 text-2xl">Update <MdBrowserUpdated /></Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn bg-yellow-200 text-2xl text-red-500">Delete <MdAutoDelete /></button>
                                    </div> */}

                                    <div className="card-actions justify-evenly">
                                        <select onChange={(e) =>
                                            handleMenuSelection(item._id, e.target.value)
                                        }
                                         className="btn bg-yellow-200 text-2xl">
                                            <option value="">Menu</option>
                                            <option value="update">Update</option>
                                            <option value="delete">Delete</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default AllContacts;