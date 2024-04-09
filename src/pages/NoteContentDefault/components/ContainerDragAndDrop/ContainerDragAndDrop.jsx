import React from 'react';
import {
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { Sortable } from './components';
import { Container, List } from './components/common';
import { useMediaQuery } from 'react-responsive';

export const ContainerDragAndDrop = ({isDarkMode, widthPadding, items, setItems, onChange}) => {
  const esMovil = useMediaQuery({ query: "(max-width: 860px)" });

  const props = {
    //   adjustScale: true,
      Container: (props) => esMovil?<List {...props} isDarkMode={isDarkMode} /> : <Container {...props} isDarkMode={isDarkMode} />,
      strategy: rectSortingStrategy,
    //   wrapperStyle: () => ({
    //     width: 140,
    //     height: 140,
    //   }),
    };
  
  return(

  <Sortable
    {...props}
    items={items}
    setItems={setItems}
    isDarkMode={isDarkMode}
    widthPadding={widthPadding}
    onChange={onChange}
    handle
    activationConstraint={{
        distance: 15,
      }}
    useDragOverlay={false} //borrar para renderizar sombra
  
  />
);}
