import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Product = () => {
    
    const [name, setName] = useState("")
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

    const [data, setData] = useState([])
    const [deleteProductId, setDeleteProductId] = useState(null)
    const addProduct = async () => {
        try {
            const url = "https://workshop-react-api.vercel.app/product"
            const user_id = localStorage.getItem('user_id')

            const res = await axios.post(url, { name, qty, price, image, user_id })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }


    const deleteProduct = async (productId) => {
        try {
            const url = `https://workshop-react-api.vercel.app/product/${productId}`
            await axios.delete(url)
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    const confirmDelete = (productId) => {
        setDeleteProductId(productId)
    }

    const handleDeleteConfirm = async () => {
        if (deleteProductId) {
            await deleteProduct(deleteProductId)
            setDeleteProductId(null)
        }
    }
    

    const fetchData = async () => {
        try {
            const user_id = localStorage.getItem('user_id')
            const url = `https://workshop-react-api.vercel.app/product?user_id=${user_id}`
            const res = await axios.get(url)
            console.log(res.data);
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchData }, [])

    return (
        <div>
            <div>
                <div className='bg-blue-200 rounded-lg shadow-lg m-10 p-5'>
                    <input placeholder="ชื่อสินค้า" className=" py-2 m-4 p-2 rounded-lg" type="text" name="name" onChange={(e) => setName(e.target.value)} />
                    <input placeholder="จำนวน" className=" py-2 m-4 p-2 rounded-lg" type="number" name="qty" onChange={(e) => setQty(e.target.value)} />
                    <input placeholder="ราคา" className=" py-2 m-4 p-2 rounded-lg" type="number" name="price" onChange={(e) => setPrice(e.target.value)} />
                    <input placeholder="รูปภาพ" className=" py-2 m-4 p-2 rounded-lg" type="text" name="image" onChange={(e) => setImage(e.target.value)} />
                    <button className='bg-blue-950 text-white py-2 px-4 rounded-lg' onClick={addProduct}>บันทึก</button>
                </div>
                <div className='bg-blue-200 rounded-lg shadow-lg m-10 p-5 '>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        รูปภาพ
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ชื่อสินค้า
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        จำนวน
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        แก้ไข/ลบ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">{item.name}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.qty}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.price}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button className='bg-orange-500 rounded-md mr-2 px-4 py-2 text-white'>แก้ไข</button>
                                            <button className='bg-red-600 rounded-md px-4 py-2 text-white' onClick={() => confirmDelete(item.id)}>ลบ</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {deleteProductId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg">
                        <p>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?</p>
                        <div className="flex justify-end mt-3">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleDeleteConfirm}>ลบ</button>
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setDeleteProductId(null)}>ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product
