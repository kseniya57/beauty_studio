import React, { useState, useEffect, useMemo } from 'react';
import { ModalContainer } from './styled';
import DoubleInput from '@/components/DoubleInput';
import { connect } from 'react-redux';
import {
  moduleName as servicesModule,
  servicesActionCreators
} from '@/store/ducks/services';
import {
  moduleName as mastersModule,
  mastersActionCreators
} from '@/store/ducks/masters';
import { FloatingButton, Icon } from '@/elements';
import Select from '@/components/Select';

function MasterServicesModal({
  masters,
  allServices,
  services,
  id,
  updateRelated,
  addRelated,
  removeRelated,
  getServices
}) {
  const [newServices, setServices] = useState(services);

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    const master = masters.find(item => item.id === id);
    if (master) {
      setServices(master.services);
    }
  }, [masters]);

  const setService = index => (servicesId) => {
    addRelated('services', id, { price: 0, servicesId });
    setServices(
      newServices.map((item, i) =>
        i === index
          ? {
              servicesId,
              price: 0,
              name: allServices.find(item => item.id === servicesId).name
            }
          : item
      )
    );
  };

  const selectItems = useMemo(() => allServices.filter(
      item => !newServices.find(service => service.servicesId === item.id)
  ), [allServices, newServices]);

  const handleRemoveRelative = relatedId => () => {
    removeRelated('services', { id, relatedId });
    setServices(newServices.filter(item => item.servicesId !== relatedId));
  };

  const save = servicesId => (values) => {
    updateRelated('services', id, { servicesId, price: values[1] });
  };

  return (
    <ModalContainer>
      <div>
        {newServices.map(({ servicesId, name, price, saved }, index) => (
          <DoubleInput
            m="1rem"
            prop="name"
            key={index}
            left={name}
            leftEl={saved === false && <Select
                placeholder={'Выберите услугу'}
                items={selectItems}
                labelKey="name"
                onChange={setService(index)}
            />}
            leftDisabled={saved !== false}
            right={price}
            onSave={save(servicesId, index)}
            onDelete={handleRemoveRelative(servicesId)}
          />
        ))}
        {selectItems.length > 0 && <FloatingButton
          position="relative"
          center
          mt="2rem"
          onClick={() => setServices([...newServices, { saved: false }])}
        >
          <Icon>add</Icon>
        </FloatingButton>}
      </div>
    </ModalContainer>
  );
}

export default connect(
  state => ({
    allServices: state[servicesModule].services,
    masters: state[mastersModule].masters
  }),
  { ...mastersActionCreators, getServices: servicesActionCreators.get }
)(MasterServicesModal);
