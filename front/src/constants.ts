/*애플리케이션에서 사용되는 상수 및 유형을 정의*/
import shortid from 'shortid';

export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(), //shortid = 무작위 숫자,문자열 생성
    type: SIDEBAR_ITEM,
    component: {
      type: 'bookmark',
      content: '북마크',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Profile',
      content: '프로필',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'StudyPlan',
      content: '스터디 일정',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'WrittenPost',
      content: '내가 작성한 글',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'StudyList',
      content: '내가 참여한 스터디',
    },
  },
];
