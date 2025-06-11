const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h1 className="text-5xl font-extrabold text-green-700 mb-6">Добро пожаловать в Left not Over</h1>
            <p className="text-xl text-gray-700 max-w-2xl mb-10">
                Наша цель — помочь фермерам продавать излишки продуктов напрямую покупателям.
                Это не только экономит деньги, но и помогает бороться с пищевыми отходами.
                Начни с просмотра доступных продуктов или добавь свои фермерские предложения!
            </p>
            <img
                src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
                alt="Фермерские продукты"
                className="rounded-2xl shadow-lg w-full max-w-xl"
            />
        </div>
    );
};

export default Home;