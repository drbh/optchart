import React, { useEffect } from "react";
import DemoDualAxes from "./Chart.js";
import { Input, Tooltip, Card, Row, Col } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { Form, InputNumber, Button } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.balance = null // 5000;
    this.currentPrice = null // 21.18;
    this.optPrice = null // 1.85;
    this.strikePrice = null // 20;
  }

  onFinish = (values) => {
    this.balance = values.bl
    this.currentPrice = values.cp
    this.optPrice = values.op
    this.strikePrice = values.st

    if (
    	this.balance && 
    	this.currentPrice && 
    	this.optPrice && 
    	this.strikePrice
    ) {
    	this.forceUpdate();
    }
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Card>
              <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
                <Form.Item name="bl" label="Balance">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
                <Form.Item name="cp" label="Current Price">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
                <Form.Item name="st" label="Strike">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
                <Form.Item name="op" label="Option Price">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
{/*
                <Form.Item name="minx" label="Min x">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
                <Form.Item name="maxx" label="Max x">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
*/}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <br />
            <Card>

            {
              this.balance && this.currentPrice && this.optPrice && this.strikePrice &&
              <DemoDualAxes
                balance={this.balance}
                currentPrice={this.currentPrice}
                strike={this.strikePrice}
                costOfOption={this.optPrice}
              />
            }
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
