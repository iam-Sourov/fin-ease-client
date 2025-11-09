import React, { useContext } from 'react';
import Banner from './Banner';
import Overview from './Overview';
import StaticSections from './StaticSections';
import { AuthContext } from '../../Contexts/AuthContext';

const Home = () => {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <Spinner />
    }
    return (
        <div className="">
            <Banner></Banner>
            <Overview></Overview>
            <StaticSections></StaticSections>
        </div>
    );
};

export default Home;