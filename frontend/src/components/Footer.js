import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from '@/elements';
import SocialIcon from '@/components/SocialIcon';
import Email from '@/components/Email';
import { moduleName as settingsModule } from '@/store/ducks/settings';

const FooterWrapper = styled.footer.attrs({
  className: 'layout'
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &>* {
      margin: 1rem 0;
    }
  }
`;

const Footer = ({ social, email, appName, city }) => (
  <div>
    <Text as="div" size="1rem" center color="base" fontColor="textAccent" p="1rem">
      <span className="layout">
        Обращаем ваше внимание на то, что данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации.
      </span>
    </Text>
    <FooterWrapper>
      <Text>
        {city}
      </Text>
      <Text center>
        <Email email={email} subject={`Сообщение с сайта ${appName}`}/><br/>
        <Link to="/policy" className="underline">Политика конфиденциальности</Link>
      </Text>
      <div>
        {social.map(item => <SocialIcon key={item.name} {...item} />)}
      </div>
    </FooterWrapper>
  </div>
);

Footer.propTypes = {
    social: PropTypes.array,
    email: PropTypes.string,
    appName: PropTypes.string,
    period: PropTypes.string,
    city: PropTypes.string,
}

export default connect(state => state[settingsModule])(Footer);