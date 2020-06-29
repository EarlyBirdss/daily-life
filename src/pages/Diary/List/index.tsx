import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Table,
  DatePicker,
  Switch,
  Icon,
  Button,
  Select,
  List,
  Typography,
  Tag,
  Divider,
  InputNumber,
  Checkbox,
  Popover,
  Popconfirm,
  message,
  Modal,
} from 'antd';
import moment from 'moment';
import { ONLY_DATE_FORMAT, PLACEHOLDER_LABEL } from '@/configs/constant.config';
import { columns, logColumns } from './options';
import { fetchDiaryList, fetchModuleList, fetchLogList, deleteDiary } from './service';
import MarkModal from './MarkModal';

const { Option } = Select;

interface QueryFormProps {
  form: { validateFields: any, getFieldDecorator: any, resetFields: any },
  onSubmit: any
}
const QueryForm = (props: QueryFormProps) => {
  const { form, onSubmit } = props;
  const { getFieldDecorator } = form;
  const [moduleList, setModuleList] = useState([]);
  const [childModuleList, setChildModuleList] = useState([]);

  useEffect(() => {
    fetchModuleList()
      .then(({ data = [] }: { data: Array<{ id: string|number, name: string, children?:Array<any> }> }) => {
        setModuleList(data);
      });
  }, []);

  const handleModuleChange = (values: Array<{ label: string, key: string }>) => {
    const modules = values.map(({ key }) => {
      const module: any = moduleList.find(({ _id }) => _id === key) || {};
      return module.children.map((item: any) => ({ parentId: module._id, ...item })) || [];
    });

    setChildModuleList(modules.reduce((a: Array<any>, b: Array<any>) => [...a, ...b], []));
  };
  const handleQuery = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, value: any) => {
      if (!err) {
        onSubmit({ ...value, modules: JSON.stringify(value.modules), childModules: JSON.stringify(value.childModules) });
      } else {
        onSubmit({});
      }
    });
  };
  const handleReset = () => {
    form.resetFields();
    onSubmit({});
  };

  return (
    <Card>
      <Form onSubmit={handleQuery} layout="inline">
        <Form.Item label="日志时间">
          {getFieldDecorator('dateRange')(<DatePicker.RangePicker />)}
        </Form.Item>
        <Form.Item label="当前第N天">
          {getFieldDecorator('day')(<InputNumber placeholder="请输入" min={0} />)}
        </Form.Item>
        <Form.Item label="模块">
          {getFieldDecorator('modules')(
            <Select
              placeholder="请选择"
              onChange={handleModuleChange}
              mode="multiple"
              allowClear={true}
              style={{ minWidth: 140 }}
              labelInValue={true} >
              {
                moduleList.map(({ _id, name }) =>
                  <Option key={_id} value={_id}>{name}</Option>)
              }
            </Select>)}
        </Form.Item>
        { !!childModuleList.length &&
            <Form.Item>
              {getFieldDecorator('childModules')(
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  allowClear={true}
                  style={{ minWidth: 140 }}
                  labelInValue={true} >
                  {
                    childModuleList.map(({ _id, name, parentId }) =>
                      <Option key={_id} value={`${_id}__${parentId}`}>{name}</Option>)
                  }
                </Select>)}
            </Form.Item>
        }
        <Form.Item label="是否已完成">
          {getFieldDecorator('isCompleted', {
            valuePropName: 'checked'
          })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} />)}
        </Form.Item>
        <Form.Item style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>查询</Button>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
      </Form>
    </Card>
  )
};

interface CustomsColumn {
  key: string,
  label: string,
  id: string,
  parentId: string
}

interface moduleItem {
  _id: string,
  name: string,
  children?: Array<any>,
  completed?: boolean
}

interface DataTableProps {
  list: Array<object>,
  customsColumns: Array<CustomsColumn>,
  pagination: object,
  onSubmit: any,
  form: { validateFields: any },
  refresh: any
}
const DataTable = (props: DataTableProps) => {
  const { list, customsColumns, pagination, onSubmit, form, refresh } = props;
  const [markModalProps, setMarkModalProps] = useState({});
  const formatedCustomsColumns = customsColumns.map(({ key, label, id, parentId }: CustomsColumn) => ({
    dataIndex: `module_${key}`,
    title: label,
    render: (_: any, { todoList, modules }: any) => {
      if (!parentId) {
        return (modules.find(({ _id }: moduleItem) => _id === id) || {}).conent || PLACEHOLDER_LABEL;
      } else {
        const todoItem = todoList.find(({ _id }: moduleItem) => _id === id);
        if (todoItem) {
          return todoItem.completed === true ? '已完成': <Tag color="#f50">未完成</Tag>;
        } else {
          const module = (modules.find(({ _id }: moduleItem) => _id === parentId) || {}).content || PLACEHOLDER_LABEL;
          return ((module.children || []).find(({ _id }: moduleItem) => _id === id) || {});
        }
      }
    }
  }));
  const placeholderIndex = columns.findIndex(({ dataIndex }) => dataIndex === 'placeholder');

  let newColumn = [...columns];
  newColumn.splice(placeholderIndex, 1, ...formatedCustomsColumns);
  newColumn = newColumn.filter(({ dataIndex }) => dataIndex !== 'placeholder');
  const [tableColumns, setTableColumns] = useState(newColumn);
  const filters = newColumn.map(({ dataIndex, title }) => ({ label: title, value: dataIndex }));
  const filterDefaultValue = filters.map(({ value }) => value);

  const operateColumn = {
    dataIndex: '_',
    title: '操作',
    fixed: 'right',
    width: 300,
    render: (_: any, { _id, date }: { _id: string, date: Date }) => (
      <>
        {/* <a href="/#/diary/detail/view">查看</a>
        <Divider type="vertical" /> */}
        <a href={`#/diary/detail/modify/${_id}`}>修改</a>
        <Divider type="vertical" />
        <a onClick={() => markGrade(_id, { date } )}>打分</a>
        <Divider type="vertical" />
        <Popconfirm title="确定删除该条日志吗？" onConfirm={() => hanldeDelete(_id)}>
          <a>删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a onClick={() => handleLogModal(_id)}>查看修改记录</a>
      </>
    )
  };

  const hanldeDelete = (_id: string) => {
    deleteDiary({ _id })
      .then(() => {
        message.success('日志已删除');
        refresh();
      });
  };

  const handleLogModal = (_id: string) => {
    fetchLogList({ _id }).then(( { data } : { data: Array<any> } ) => {
      const content = <Table columns={logColumns} dataSource={data} pagination={false} bordered={true} />;
      Modal.info({
        title: '修改记录',
        content,
        okText: '确定',
        width: 760,
        icon: <></>,
      });
    });
  };

  const markGrade = (_id: string, { date }: { date: Date }) => {
    setMarkModalProps({
      _id,
      dateString: moment(date).format(ONLY_DATE_FORMAT),
      onClose: refresh
    });
  };

  const handleFilterChange = (values: Array<string>) => {
    newColumn = newColumn.filter(({ dataIndex }) => values.includes(dataIndex));
    setTableColumns(newColumn);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter;
    form.validateFields((err: any, value: any) => {
      const sortConfig = {
        sortFiled: field,
        sortOrder: order,
      };
      if (!err) {
        onSubmit({...value, current: 1, ...sortConfig});
      }
    });
  }

  return (
    <>
      <div style={{ margin: "10px 0", textAlign: 'right' }}>
        <Button type="primary" icon="plus" href={`#/diary/detail/create`} style={{ marginRight: 8 }}>新建日志</Button>
        <Popover
          placement="bottomRight"
          trigger="click"
          title="请选择展示项"
          content={ <Checkbox.Group options={filters} defaultValue={filterDefaultValue} onChange={handleFilterChange}></Checkbox.Group> }
        >
          <Button
            icon="filter"
          >筛选</Button>
        </Popover>
      </div>
      <Table
        dataSource={list}
        columns={[...newColumn, operateColumn]}
        style={{ marginTop: 20 }}
        onChange={handleTableChange}
        pagination={{
          showTotal: total => `共${total}条`,
          showSizeChanger: true,
          pageSize: 7,
          pageSizeOptions: ['7', '14', '30'],
          ...pagination
        }}
        rowKey="_id"
        >
      </Table>
      <MarkModal {...markModalProps} />
    </>
  )
}
interface ReportPanelProps {
  reportList: Array<any>
}
const ReportPanel = (props: ReportPanelProps) => {
  const { reportList } = props;
  const todoList = reportList.reduce((a, b) => a.concat(b.todoList), []);
  const todoMap: any = {};
  todoList.forEach(({ name, completed }: moduleItem) => {
    if (todoMap[name]) {
      completed === true && ++(todoMap[name]);
    } else {
      todoMap[name] = completed === true ? 1 : 0;
    }
  });
  const list = Object.keys(todoMap).map(name => ({ name, times: todoMap[name] })).sort((a, b) => a.times - b.times);
  return (
    <>
      <Divider orientation="left">结果统计</Divider>
      <List
        header={<div>今日计划</div>}
        dataSource={list}
        bordered
        renderItem={item => (
          <List.Item>
            <Tag color="magenta">{item.name}</Tag> 已完成<Typography.Text mark> {item.times} </Typography.Text>次
          </List.Item>
        )}
      >
      </List>
    </>
  )
};

// interface QueryFormParams {
//   dateRange?: Array<string>,
//   day?: number,
//   modules?: Array<string>,
//   childModules?: Array<string>,
//   isCompleted?: Boolean,
//   sortFiled?: string,
//   sortOrder?: string,
// }

function Diary(props: any) {
  const { form } = props;
  const [listConfig, setListConfig] = useState({ list: [], pagination: {}, customsColumns: [] });
  // const reportList = [{ name: '阅读', times: 14 }, { name: 'EF UNIT', times: 7 }];
  useEffect(() => {
    fetchDiaryList({})
      .then(({ data = [] }: { data: Array<object> }) => {
        setListConfig(data);
      });
  }, []);

  const onQueryFormSubmit = (params: object) => {
    fetchDiaryList(params)
      .then(({ data }: { data: Array<object> }) => {
        setListConfig(data);
      });
  };

  return (
    <>
      <QueryForm {...props} onSubmit={onQueryFormSubmit} />
      <DataTable {...listConfig} form={form} onSubmit={onQueryFormSubmit} refresh={onQueryFormSubmit} />
      <ReportPanel reportList={listConfig.list} />
    </>
  );
}

export default Form.create()(Diary);
