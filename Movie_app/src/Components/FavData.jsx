export const GetFavourites = ({ favourites }) => {
    return (
        <div>
            <h1>Favourites</h1>
            {favourites.length >0 ? (
                <div>
                    {favourites.map((fav)=> (
                        <div>
                            {fav.title}

                        </div>
                    ))}
                </div>
            ): null}

        </div>
    )
            
};
