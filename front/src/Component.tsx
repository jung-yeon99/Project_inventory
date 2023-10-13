import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT, SIDEBAR_ITEMS } from './constants';
import Button from './Button';
import SideBarItem from './SideBarItem';

const style = {
  border: 'none',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  backgroundColor: '#222121',
  cursor: 'move',
};

const Component = ({ data, components, path }) => {
  const ref = useRef(null);
  const component = components[data.id];

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (SIDEBAR_ITEMS[0].component.type === component.type) {
    console.log('이미 있는 위젯 입니다!');
  }
  const opacity = isDragging ? 0 : 1;
  drag(ref);

  //특정 컴포넌트에만 나오게 컴포넌트가 나오도록 수정
  let button = null;

  if (component.type === 'Profile') {
    button = <Button />;
  }
  // console.log(SIDEBAR_ITEMS[0].component.type);
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className='component draggable'
    >
      <div>{data.id}</div>
      <div>{component.content}</div>
      <div>{button}</div>
    </div>
  );
};
export default Component;
