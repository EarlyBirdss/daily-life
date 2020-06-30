export const HOST = 'http://127.0.0.1:8082';
export const STORAGE_USER_KEY = 'LITTLE_CABIN_USER_INFO';

export const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const ONLY_DATE_FORMAT = 'YYYY-MM-DD';
export const PLACEHOLDER_LABEL = '--';

export const ControllerType = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
  // EDITOR: 'EDITOR',
  CHECKBOX: 'CHECKBOX',
  NONE: 'NONE',
  // TODOLIST: 'TODOLIST',
};

export const UserInfoInputType = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGON',
  EDIT: 'EDIT',
};

export const ControllerTypes = [
  { id: ControllerType.INPUT, name: ControllerType.INPUT },
  { id: ControllerType.TEXTAREA, name: ControllerType.TEXTAREA },
  // { id: ControllerType.EDITOR, name: ControllerType.EDITOR },
  { id: ControllerType.CHECKBOX, name: ControllerType.CHECKBOX },
  { id: ControllerType.NONE, name: ControllerType.NONE },
  // { id: ControllerType.TODOLIST, name: ControllerType.TODOLIST },
];
