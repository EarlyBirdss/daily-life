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
  costomerModules?: Array<CostomModulesProps>,
}