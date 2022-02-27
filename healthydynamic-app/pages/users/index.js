import Head from "next/head";
import AppLayout from "../../components/Layouts/AppLayout";
import { useUser } from "../../hooks/useUser";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const User = () => {
  const router = useRouter();

  const [errors, setErrors] = useState([]);

  const MySwal = withReactContent(Swal);

  const { users, deleteUser } = useUser();

  const handleDeleteUser = (id) => {
    MySwal.fire({
      icon: "warning",
      title: "Do you want to delete it?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser({
          setErrors,
          id,
        });
      }
    });
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Users
        </h2>
      }
    >
      <Head>
        <title>Healthy Dynamic - Users</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="my-5">
                <Link href="/users/add">
                  <a>
                    <Button type="button" className="bg-green-800">
                      Add User
                    </Button>
                  </a>
                </Link>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nick Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users ? (
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.profile ? user.profile.full_name : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.profile ? user.profile.nick_name : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.profile ? user.profile.gender : ""}
                        </td>
                        <td className="px-6 py-4">
                          {user.profile ? user.profile.address : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.profile ? user.profile.phone : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            type="button"
                            onClick={() =>
                              router.push(`/users/edit/${user.id}`)
                            }
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-800"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="6">
                        No Record
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default User;
