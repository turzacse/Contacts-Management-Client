import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AddContacts from "../Pages/AddContacts/AddContacts";
import AllContacts from "../Pages/AllContacts/AllContacts";
import UpdateContact from "../Pages/UpdateContact/UpdateContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/addcontacts',
        element: <AddContacts />
      },
      {
        path: '/contacts',
        element: <AllContacts />
      },
      {
        path: '/updatecontact/:id',
        element: <UpdateContact/>,
        loader: async({ params }) => await fetch(`https://contacts-management-server.vercel.app/contacts/${params.id}`)
      },
    ]
  },
]);