export const Pagination = () => {
    return (
        <div className="flex justify-center text-sm mt-10 gap-2">
            <button className="bg-blue-600 text-white px-4 p-1 rounded-sm hover:bg-blue-500">&larr;</button>
            <button className="bg-blue-600 text-white px-4 p-1 rounded-sm hover:bg-blue-500">1</button>
            <button className="bg-blue-600 text-white px-4 p-1 rounded-sm hover:bg-blue-500">0</button>
            <button className="bg-blue-600 text-white px-4 p-1 rounded-sm hover:bg-blue-500">2</button>
            <button className="bg-blue-600 text-white px-4 p-1 rounded-sm hover:bg-blue-500">&rarr;</button>
        </div>
    )
}