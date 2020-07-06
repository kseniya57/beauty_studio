import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { moduleName as settingsModule } from '@/store/ducks/settings';

const mapStyle = {
  width: '100%',
  height: '40rem'
};

function Map({ addresses }) {

  useEffect(() => {
    ymaps.ready(init);
    function init(){
      const lat = addresses.reduce((acc, item) => acc + item.lat, 0) / addresses.length;
      const lng = addresses.reduce((acc, item) => acc + item.lng, 0) / addresses.length;
      const myMap = new ymaps.Map("map", {
        center: [lat, lng],
        // Уровень масштабирования 0-19
        zoom: 17,
        type: 'yandex#hybrid'
      }, {
        // Санкт-Петербург.
        restrictMapArea: [
          [59, 29],
          [61, 31]
        ]
      });

      addresses.forEach(item => {
        myMap.geoObjects.add(new ymaps.Placemark([item.lat, item.lng], {
          balloonContent: item.address,
          iconCaption: item.name
        }, {
          preset: 'islands#blueDotIconWithCaption'
        }))
      });
    }
  }, []);

  return (
    <div id="map" style={mapStyle} />
  )
}

Map.propTypes = {
  addresses: PropTypes.array,
};

export default connect(state => ({
  addresses: state[settingsModule].addresses,
}))(Map);
