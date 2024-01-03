import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { FaBookmark } from "react-icons/fa";

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

    const handleFavorite = (id) => {
        const updatedProject = project.map((item) =>
            item._id === id ? { ...item, role: "favorite" } : item
        );
        setProject(updatedProject);

        fetch(`https://contacts-management-server.vercel.app/contacts/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'favorite' }), 
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to update favorite status');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Contact marked as favorite:', data);
        if (data.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Your contacts marked as Favourite',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    .catch((error) => {
        console.error('Error updating favorite status:', error.message);

    });
    };

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

                                    <div className="card-actions justify-evenly">
                                        <div
                                            onClick={() =>
                                                handleFavorite(item._id)
                                            }
                                            className="btn text-2xl"
                                            style={{
                                                color: item.role === "favorite" ? "green" : "inherit"
                                            }}
                                        >
                                            <FaBookmark/>
                                        </div>


                                        <select onChange={(e) =>
                                            handleMenuSelection(item?._id, e.target.value)
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