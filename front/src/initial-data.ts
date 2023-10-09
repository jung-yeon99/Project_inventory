/*초기 레이아웃 및 컴포넌트 데이터를 정의*/
import { COMPONENT, ROW, COLUMN } from './constants';

const initialData = {
  layout: [
    {
      type: ROW,
      id: 'GridLayer',
      children: [
        {
          type: COLUMN,
          id: 'column0',
          children: [
            {
              type: COMPONENT,
              id: 'component0',
            },
            {
              type: COMPONENT,
              id: 'component1',
            },
          ],
        },
        {
          type: COLUMN,
          id: 'column1',
          children: [
            {
              type: COMPONENT,
              id: 'component2',
            },
            {
              type: COMPONENT,
              id: 'component3',
            },
          ],
        },
      ],
    },
    // {
    //     type: ROW,
    //     id: "row1",
    //     children: [
    //         {
    //             type: COLUMN,
    //             id: "column2",
    //             children: [
    //                 {
    //                     type: COMPONENT,
    //                     id: "component3",
    //                 },
    //                 {
    //                     type: COMPONENT,
    //                     id: "component0",
    //                 },
    //                 {
    //                     type: COMPONENT,
    //                     id: "component2",
    //                 },
    //             ],
    //         },
    //     ],
    // },
  ],
  components: {
    component0: { id: 'component0', type: 'input', content: '북마크' },
    component1: { id: 'component1', type: 'image', content: '프로필' },
    component2: { id: 'component2', type: 'email', content: '스터디 일정' },
    component3: { id: 'component3', type: 'name', content: '내가 작성한 글' },
    component4: {
      id: 'component4',
      type: 'phone',
      content: '내가 참여한 스터디',
    },
  },
};

export default initialData;
