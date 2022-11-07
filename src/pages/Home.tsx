import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getPopularMovies } from '../services/http/movies.service';

const Home = () => {
    const { mutateAsync } = useMutation(() => getPopularMovies());
    const [results, setResults] = useState([]);

    const fetchData = async () => {
        const res = await mutateAsync();
        console.log(res);
        setResults(res.results);
    };

    useEffect(() => {
        fetchData()
            .then((val) => console.log(val))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="grid grid-cols-4">
            {results.length !== 0 &&
                results.map((res) => {
                    return (
                        <div className="card w-96 bg-base-100 shadow-xl image-full" key={res.id}>
                            <figure>
                                <img src={res.poster} alt={res.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{res.title}</h2>
                                <p>{res.release_date}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">
                                        Add to favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Home;
