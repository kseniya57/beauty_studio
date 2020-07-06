import React from 'react';
import MetaTags from 'react-meta-tags';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import School from '@/pages/School'
import Course from '@/pages/Course'
import Contacts from '@/pages/Contacts'
import Vacancy from '@/pages/Vacancy';
import Policy from '@/pages/Policy';
import styled, { ThemeProvider } from 'styled-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { connect } from 'react-redux';
import { moduleName as settingsModule, getSettings } from '@/store/ducks/settings';
import { getCards } from '@/store/ducks/data';


const AppLayout = styled.div`
  width: 100%;
`;

const App = (props) => {
    return (<ThemeProvider theme={props.theme}>
        <AppLayout>
            <MetaTags>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
                <meta property="keywords" content={props.keywords} />
                <meta property="og:type" content={props['og:type']} />
                <meta property="og:site_name" content={props['og:site_name']} />
                <meta property="og:title" content={props['title']} />
                <meta property="og:url" content={props['og:url']} />
            </MetaTags>
            <Header />
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/services' exact component={Services}/>
                <Route path='/school' exact component={School}/>
                <Route path='/contacts' exact component={Contacts}/>
                <Route path='/vacancy' exact component={Vacancy}/>
                <Route path='/course/:id' exact component={Course}/>
                <Route path='/policy' exact component={Policy}/>
            </Switch>
            <Footer />
        </AppLayout>
    </ThemeProvider>);
}

App.propTypes = {
    theme: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    ['og:type']: PropTypes.string,
    ['og:site_name']: PropTypes.string,
    ['og:url']: PropTypes.string,
};

export default connect(state => state[settingsModule], { getSettings, getCards })(App);
