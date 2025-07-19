import {useGetFarmsQuery} from "../../service/userApi.ts";

const Farms = () => {
    const {data, error, isLoading} = useGetFarmsQuery();

    if (isLoading) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl font-bold animate-pulse">Error... {errorMessage}</div>
            </div>
        );
    }
    return (
        <div className="container">
            <h1>Farms</h1>
            {data && data.length > 0 ? (
                <ul>
                    {data.map((farm) => (
                        <li key={farm.login}>
                            {farm.email} - ${farm.email}
                            {farm.phone} - ${farm.phone}
                            {farm.farmName} - ${farm.farmName}
                            {farm.city} - ${farm.city}
                            {farm.street} - ${farm.street}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Farms Found</p>
            )}
        </div>
    )
}

export default Farms;