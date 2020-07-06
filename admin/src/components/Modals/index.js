import React from 'react';
import { useSpring } from 'react-spring';
import { Overlay, Content, CloseIcon } from './styled';

import CardImagesModal from './CardImagesModal';
import CoursePracticeModal from './CoursePracticeModal';
import CourseScheduleModal from './CourseScheduleModal';
import MasterServicesModal from './MasterServicesModal';
import ImageEditor from '@/components/ImageEditor';

const modals = {
  'card-images': <CardImagesModal defaultOpen={true} />,
  'course-practice': <CoursePracticeModal type="practice" defaultOpen={true} />,
  'course-theory': <CoursePracticeModal type="theory" defaultOpen={true} />,
  'course-schedule': <CourseScheduleModal defaultOpen={true} />,
  'master-services': <MasterServicesModal defaultOpen={true} />,
  imageEditor: <ImageEditor defaultOpen={true} />
};

export const ModalsContext = React.createContext(null);

export default function Modals({ close, data }) {
  const isOpen = !!data;

  const overlayAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    left: isOpen ? '0' : '50%',
    right: isOpen ? '0' : '50%',
  });

  return <Overlay style={overlayAnimation}>
    <CloseIcon onClick={close}>close</CloseIcon>
    {data && <Content>
      {React.cloneElement(modals[data.modal], {
        ...data.props,
        close
      })}
      </Content>
    }
  </Overlay>;
}
