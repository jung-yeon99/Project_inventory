/*사이드바에서 드래그 가능한 항목을 나타내는 컴포넌트로, 드래그 앤 드롭 기능을 활성화*/
import { useDrag } from 'react-dnd';
import { COLUMN } from './constants';

function SideBarItem({ data }) {
  const [{ opacity }, drag] = useDrag({
    type: COLUMN,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className='sideBarItem' ref={drag} style={{ opacity }}>
      {data.component.content}
    </div>
  );
}
export default SideBarItem;
