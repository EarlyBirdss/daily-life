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
  message,
} from 'antd';
import { columns } from './options';
import { fetchDiaryList, fetchModuleList } from './service';

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
  const handleModuleChange = (values: Array<string|number>) => {
    const modules = values.map(value => {
      const module = moduleList.find(({ id }) => id === value);
      return module.children || [];
    });

    setChildModuleList(modules.reduce((a: Array<any>, b: Array<any>) => [...a, ...b], []));
  };
  const handleQuery = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, value: any) => {
      if (!err) {
        onSubmit({...value});
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
          {getFieldDecorator('day')(<InputNumber placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="模块">
          {getFieldDecorator('module')(
            <Select placeholder="请选择" onChange={handleModuleChange} mode="multiple" allowClear={true} style={{ minWidth: 140 }}>
              {
                moduleList.map(({ id, name }) =>
                  <Option key={id} value={id}>{name}</Option>)
              }
            </Select>)}
        </Form.Item>
        { !!childModuleList.length &&
            <Form.Item>
              {getFieldDecorator('childModule')(
                <Select placeholder="请选择" mode="multiple" allowClear={true} style={{ minWidth: 140 }}>
                  {
                    childModuleList.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>)
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

interface DataTableProps {
  list: Array<object>,
  customsColumns: Array<{ id: string, name: string }>,
  pagination: object,
  onSubmit: any,
  form: { validateFields: any }
}
const DataTable = (props: DataTableProps) => {
  const { list, customsColumns, pagination, onSubmit, form } = props;
  const formatedCustomsColumns = customsColumns.map(({ id, name }: { id: string, name: string }) => ({
    dataIndex: `module_${id}`,
    title: name,
  }));
  const placeholderIndex = columns.findIndex(({ dataIndex }) => dataIndex === 'placeholder');
  let newColumn = [...columns];
  newColumn.splice(placeholderIndex, 0, ...formatedCustomsColumns);
  newColumn = newColumn.filter(({ dataIndex }) => dataIndex !== 'placeholder');
  const [finalColumn, setFinalColumn] = useState(newColumn);
  const filters = newColumn.map(({ dataIndex, title }) => ({ label: title, value: dataIndex }));
  const filterDefaultValue = filters.map(({ value }) => value);
  const operateColumn = {
    dataIndex: '_',
    title: '操作',
    fixed: 'right',
    width: 200,
    render: (_, { id }: { id: number }) => (
      <>
        <Button type="link" href={`/#/diary/detail/${id}`} style={{ padding: 0, marginRight: 8 }}>查看</Button>
        <Button type="link" href={`/#/diary/modify/${id}`} style={{ padding: 0, marginRight: 8 }}>修改</Button>
        <Button type="link" style={{ padding: 0 }}>查看修改日志</Button>
      </>
    )
  };
  const handleFilterChange = (values: Array<string>) => {
    newColumn = newColumn.filter(({ dataIndex }) => values.includes(dataIndex));
    setFinalColumn(newColumn);
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
      <div style={{ float: "right" }}>
        {/* TODO: 样式优化 */}
        <Button type="primary" icon="plus" style={{ marginRight: 10 }}>新增</Button>
        <Button type="primary" icon="plus" style={{ marginRight: 10 }}>生成一周模版</Button>
        <Popover
          placement="bottomRight"
          trigger="click"
          title="请选择展示项"
          content={ <Checkbox.Group options={filters} defaultValue={filterDefaultValue} onChange={handleFilterChange}></Checkbox.Group> }
        >
          <Button
            type="primary"
            icon="filter"
            style={{ margin: "10px 0" }}
          >筛选</Button>
        </Popover>
      </div>
      <Table
        dataSource={list}
        columns={[...finalColumn, operateColumn]}
        style={{ marginTop: 20 }}
        onChange={handleTableChange}
        pagination={{
          showTotal: total => `共${total}条`,
          showSizeChanger: true,
          pageSize: 7,
          pageSizeOptions: ['7', '14', '30'],
          ...pagination
        }}
        rowKey="id"
        >
      </Table>
    </>
  )
}
interface ReportPanelProps {
  reportList: Array<{ name: string, times: number }>
}
const ReportPanel = (props: ReportPanelProps) => {
  const { reportList } = props;
  return (
    <>
      <Divider orientation="left">结果统计</Divider>
      <List
        header={<div>今日计划</div>}
        dataSource={reportList}
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
//   module?: Array<string>,
//   childModule?: Array<string>,
//   isCompleted?: Boolean,
//   sortFiled?: string,
//   sortOrder?: string,
// }
function Diary(props: any) {
  const { form } = props;
  const [listConfig, setListConfig] = useState({ list: [], pagination: {}, customsColumns: [] });
  const reportList = [{ name: '阅读', times: 14 }, { name: 'EF UNIT', times: 7 }];
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
      <DataTable {...listConfig} form={form} onSubmit={onQueryFormSubmit} />
      <ReportPanel reportList={reportList} />
    </>
  );
}

export default Form.create()(Diary);
