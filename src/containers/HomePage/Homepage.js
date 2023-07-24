import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About'
import HomeFooter from './HomeFooter'
import './Homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Homepage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,  //hiem thi 4 cai
            slidesToScroll: 1 // next 1 cai 1 lan click
        };

        return (

            <div>
                <HeaderHome />
                <Specialty
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />

                <OutstandingDoctor
                    settings={settings}
                />
                <HandBook
                    settings={settings}
                />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
