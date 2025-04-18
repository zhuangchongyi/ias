import { Button, CalendarPickerView, Card, Divider } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import moment from 'moment';

const RecordTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const minDate = new Date('2025-04-01');

  const handleCalendarData = (date: Date) => {
    // 模拟有数据的天显示小圆点
    const daysWithData = [1, 2, 3, 6, 7, 10, 15, 18];
    return daysWithData.includes(dayjs(date).date()) ? (
      <div style={{ fontSize: 8, color: '#1677ff' }}>●</div>
    ) : null;
  };
  
  const handleRenderDate = (date: Date) => {
    const commonStyle = {
      color: isWeekend(date) ? '#ccc' : '#000',
    }
    return isCurrentMonth(date) ? (
      <div style={commonStyle}>
        {dayjs(date).date()}
      </div>
    ) : null;
  }

  //判断日期是周末还是工作日
  const isWeekend = (date: Date) => {
    return moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7; // 判断是否为周末，ISO周的周日和周六是6和7
  }

  // 判断日期是否为本月
  const isCurrentMonth = (dateString: Date) => {
    return moment(dateString).isSame(moment(), 'month');
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 日期选择 */}
      <div style={{ padding: 12, background: '#fff' }}>
        <CalendarPickerView
          selectionMode="single"
          value={currentDate}
          min={minDate}
          onChange={(val) => setCurrentDate(val!)}
          renderBottom={handleCalendarData}
          renderDate={handleRenderDate}
        />
      </div>

      {/* 打卡信息 */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        <Card title="上下班打卡（工时-）" extra="打卡规则：公司">
          <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{ fontWeight: 'bold', fontSize: 16 }}>09:00</div>
              <div style={{ border: '2px solid #f1f2f8', height: 30, width: 0, borderRadius: 8, margin: '8px 0' }}></div>
              <div style={{ color: '#ccc',fontWeight: 'bold', fontSize: 16 }}>18:00</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1,marginLeft: 16}}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>上班 · 自动</div>
                <div style={{ color: 'grey', fontSize: 12, marginTop: 4}}>正常（08:27）</div>
              </div>
              <Divider />
              <div style={{ color: '#ccc' }}>下班</div>
            </div>
          </div>
        </Card>

        {/* 导出报表 */}
        <div style={{ marginTop: 16 }}>
          <Button block color="primary" fill="outline" size="small">
            导出报表（我的考勤汇总）
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordTab;
