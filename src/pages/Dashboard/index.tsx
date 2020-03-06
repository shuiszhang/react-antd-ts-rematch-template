import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts'

import { Dispatch, IRootState } from '@/store'
import './index.less'

// 此处映射 model 里面的 state 到 props 上
const mapState = (state: IRootState) => ({
  points: state.dashboard.points,
  points2: state.dashboard.points2,
  loading: state.loading.effects.dashboard.asyncGetData
})

// 此处映射 model 里面的方法(effects, reducers)到 props 上
const mapDispatch = (dispatch: Dispatch) => ({
  getData: dispatch.dashboard.asyncGetData
})

// 此处放外部需要传递进来的 props 属性
interface IDashboardProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Dashboard extends Component<IDashboardProps, null> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getData()
  }

  render() {
    const scale1 = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    }
    const scale2 = {
      value: {
        tickInterval: 2
      }
    }
    const scale3 = {
      year: {
        type: 'linear',
        tickInterval: 50
      }
    }
    return (
      <Spin spinning={this.props.loading}>
        <div className="dashboard">
          <div className="container">
            <div className="title">折线图</div>
            <Chart height={400} data={this.props.points} scale={scale1}>
              <Axis name="year" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: 'y'
                }}
              />
              <Geom type="line" position="year*value" size={2} />
              <Geom
                type="point"
                position="year*value"
                size={4}
                shape={'circle'}
                style={{
                  stroke: '#fff',
                  lineWidth: 1
                }}
              />
            </Chart>
          </div>
          <div className="container">
            <div className="title">柱状图</div>
            <Chart height={400} data={this.props.points} scale={scale2}>
              <Axis name="year" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: 'y'
                }}
              />
              <Geom type="interval" position="year*value" />
            </Chart>
          </div>
          <div className="container">
            <div className="title">南丁格尔玫瑰图</div>
            <Chart height={400} data={this.props.points} padding="auto">
              <Coord type="polar" />
              <Tooltip />
              <Legend position="right" offsetY={-80} offsetX={-80} />
              <Geom
                type="interval"
                color="year"
                position="year*value"
                style={{
                  lineWidth: 1,
                  stroke: '#fff'
                }}
              >
                <Label
                  content="value"
                  formatter={(val, item) => {
                    return item.point.year + ': ' + val
                  }}
                />
              </Geom>
            </Chart>
          </div>
          <div className="container">
            <div className="title">面积图</div>
            <Chart
              height={400}
              data={this.props.points2}
              scale={scale3}
              padding="auto"
            >
              <Axis name="year" />
              <Axis name="value" />
              <Legend />
              <Tooltip />
              <Geom type="areaStack" position="year*value" color="country" />
              <Geom
                type="lineStack"
                position="year*value"
                size={2}
                color="country"
              />
            </Chart>
          </div>
        </div>
      </Spin>
    )
  }
}

export default connect(mapState, mapDispatch)(Dashboard)
