import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import { moduleName as settingsModule } from '@/store/ducks/settings';

import Flex from '@/elements/Flex';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

import Home from '@/pages/Home';
import Cards from '@/pages/Cards';
import Courses from '@/pages/Courses';
import Faq from '@/pages/Faq';
import Features from '@/pages/Features';
import Masters from '@/pages/Masters';
import Photos from '@/pages/Photos';
import ProfessionalFeatures from '@/pages/ProfessionalFeatures';
import Settings from '@/pages/Settings';
import Texts from '@/pages/Texts';
import Addresses from '@/pages/Addresses';
import Social from '@/pages/Social';
import Services from '@/pages/Services';
import Vacancy from '@/pages/Vacancy';
import Reviews from '@/pages/Reviews';

import Modals, { ModalsContext } from './Modals';

const AppLayout = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const Container = styled.div`
  max-height: 100vh;
  padding: 3rem;
  overflow: auto;
`;

const App = ({ settings }) => {
  const [modalData, setModalData] = useState([]);
  const closeModal = () => setModalData(modalData.slice(0, modalData.length - 1));
  return (
    <ThemeProvider theme={settings.theme}>
      <AppLayout>
        <Sidebar />
        <div className={'fullwidth'}>
          <Header />
          <ModalsContext.Provider
            value={{ openModal: (data) => setModalData(modalData.concat(data)), closeModal }}
          >
            <Container>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/cards" exact component={Cards} />
                <Route path="/courses" exact component={Courses} />
                <Route path="/faq" exact component={Faq} />
                <Route path="/features" exact component={Features} />
                <Route path="/masters" exact component={Masters} />
                <Route path="/photos" exact component={Photos} />
                <Route
                  path="/professionalFeatures"
                  exact
                  component={ProfessionalFeatures}
                />
                <Route path="/settings" exact component={Settings} />
                <Route path="/texts" exact component={Texts} />
                <Route path="/addresses" exact component={Addresses} />
                <Route path="/social" exact component={Social} />
                <Route path="/services" exact component={Services} />
                <Route path="/vacancies" exact component={Vacancy} />
                <Route path="/reviews" exact component={Reviews} />
              </Switch>
              <Modals data={_.last(modalData)} close={closeModal} />
            </Container>
          </ModalsContext.Provider>
        </div>
      </AppLayout>
    </ThemeProvider>
  );
};

export default connect(state => state[settingsModule])(App);
