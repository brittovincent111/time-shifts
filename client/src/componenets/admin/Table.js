import React from 'react'



function Table( {obj , hours ,remaining_minutes}) {
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {obj._id.date}
            </th>
            <td class="py-4 px-6">
                {obj.total} hr
            </td>
            <td class="py-4 px-6">
                {hours} hr {remaining_minutes} min
            </td>
            <td class="py-4 px-6">
                {obj._id.status}
            </td>
            <td class="py-4 px-6">
                {obj.count}
            </td>


        </tr>
    )
}

export default Table