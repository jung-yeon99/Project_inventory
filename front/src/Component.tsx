import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from './constants';
import Button from './Button';

const style = {
  border: 'none',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  backgroundColor: '#222121',
  cursor: 'move',
};
const Component = ({ data, components, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  //특정 컴포넌트에만 나오게 컴포넌트가 나오도록 수정
  let button = null;

  if (component.type === 'Profile') {
    button = <Button />;
  }
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
