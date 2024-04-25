import React from "react";

function VListing({ list }) {
  console.log("list: ", list);
  return (
    <tr
      className={`bg-base-500 border-b border-blue-200  text-black hover:text-white dark:border-gray-700 font-poppins hover:bg-slate-600 hover:cursor-pointer`}
    >
      <th className="px-7 py-4 whitespace-nowrap text-sm font-medium text-blue-600  uppercase">
        {list.name}
      </th>
      <td className={`px-7 py-2 whitespace-nowrap text-sm`}>{list.category}</td>

      <td className={`px-7 py-2 whitespace-nowrap text-sm } uppercase`}>
        {list.city}
      </td>
      <td className={`px-7 py-2 whitespace-nowrap text-sm } uppercase`}>
        {list.price}
      </td>
      <td className={`px-7 py-2 whitespace-nowrap text-sm } uppercase`}>
        {list.contact}
      </td>
    </tr>
  );
}

export default VListing;
