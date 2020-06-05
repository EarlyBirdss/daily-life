export interface TodoItemProps {
  id: string|number,
  name: string,
  remark?: string,
  completed: boolean,
}

export interface CostomModuleChildProps {
  id: string|number,
  name: string,
  content: string,
  controllerType: string,
}

export interface CostomModulesProps {
  id: string|number,
  name: string,
  content?: string,
  controllerType: string,
  children?: Array<CostomModuleChildProps>,
}

export interface ContentProps {
  todoList: Array<TodoItemProps>,
  costomerModules: Array<CostomModulesProps>,
}

export interface ControllerProps {
  placeholder?: string,
  editorState?: object,
  onEditorChange?: any,
}

export interface AddTodoItemProps {
  selectedItems: Array<TodoItemProps>,
  form: any,
  onClose: any,
}

export interface BasicModuleItem {
  id: number,
  name: string,
}

export interface AddModuleProps {
  selectItems: Array<BasicModuleItem>,
  form: any,
  onclose: any,
}

