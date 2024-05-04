export const Error = ({error}) =>{
    return (
        <div className="flex">
            {error && <div className="text-lg text-white font-bold">
                No movie found
                </div>}


        </div>
    )
}