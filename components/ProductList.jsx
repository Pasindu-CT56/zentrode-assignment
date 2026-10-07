import { useEffect, useState } from "react";
import axios from "axios";


export default function ProductList() {

    const [products, setProducts] = useState([])

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

         const skip = (currentPage - 1) * pageSize;

        axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`).then(
            (response) => {
                setProducts(response.data.products);

                const total = response.data.total;
                setTotalPages(Math.ceil(total / pageSize));
            }
        ).catch((error) => {
            console.log(error);
        })

    }, [currentPage, pageSize])



    return (
        <div className="w-full max-h-full  flex flex-col p-4 items-start gap-0 overflow-y-scroll">

            <div className="w-full h-[80px] bg-red-200 flex  items-center justify-center ">
                <h2 className="text-2xl font-bold">Product List</h2>
            </div>

            <table className="w-full  bg-white shadow-md overflow-hidden text-center mb-[100px] ">
                <thead className=" text-black h-[60px]">
                    <tr>
                        <th>Product ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Thumbnail</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {products.map((item) => {
                        return (
                            <tr key={item.id} className="odd:bg-gray-200 h-[50px]">
                                
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <img src={item.thumbnail} alt={item.title}  />
                                </td>

                                    
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        
            <div className="w-full h-[80px] flex justify-center items-center gap-6">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>

            </div>


        </div>


    )
}