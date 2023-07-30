import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment'
import { RestFilled } from "@ant-design/icons";
import { apiUrl } from "../../utils/settings";

function DashboardList() {

    const [studentsList, setStudentsList] = useState([])

    const fetchUsers = async (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/user/getUser?Date=${moment(name).format('LL') || ""}&searchText=`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Res **************", response.data);
                setStudentsList(response?.data?.data)
            })
            .catch((error) => {
                console.log("Error *******************", error);
            });
    }

    useEffect(() => {
        let date = new Date();
        fetchUsers(date)
    }, [])

    console.warn("******* Users *********", studentsList)

    return (
        <>
            <div>
                <div className="w-full">
                    <div className="px-4 py-4 bg-white md:py-7 md:px-8 xl:px-10">
                        <div className="overflow-x-auto mt-7">
                            {studentsList?.length > 0 ?
                                <table className="w-full whitespace-nowrap">
                                    <tbody>
                                        {studentsList?.map((item, index) => {
                                            return (
                                                <tr className="h-16 border border-gray-100 rounded">
                                                    <td className>
                                                        <div className="flex items-center pl-5">
                                                            <p className="mr-2 text-base font-medium leading-none text-gray-700">{item?.Name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="ml-2 text-sm leading-none text-gray-600">{moment(item?.DOJoin).format('LL')}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="ml-2 text-sm leading-none text-gray-600">RS. <span className="font-bold">{item?.Amount}</span></p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="ml-2 text-sm leading-none text-gray-600">{moment(item?.DOValid).format('LL')}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="ml-2 text-sm font-bold leading-none text-gray-600">{item?.Code}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <button className="px-3 py-3 text-sm leading-none text-red-500 bg-red-100 rounded focus:outline-none hover:bg-red-200">Due today</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                :
                                <div className="p-4 font-bold text-center">
                                    <div>
                                        <RestFilled style={{ fontSize: '24px'}} />
                                    </div>
                                    No due found!!
                                </div>
                            }               
                        </div>
                    </div>
                </div>
                <style>
                    {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
                </style>
            </div>
        </>
    );
}

export default DashboardList;
