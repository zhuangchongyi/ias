import { Button, Calendar, Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';

const RecordTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCalendarData = (date: Date) => {
    // 模拟有数据的天显示小圆点
    const daysWithData = [1, 2, 3, 6, 7, 10, 15, 18];
    return daysWithData.includes(dayjs(date).date()) ? (
      <div style={{ fontSize: 8, color: '#1677ff' }}>●</div>
    ) : null;
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 日期选择 */}
      <div style={{ padding: 12 }}>
        <Calendar
          selectionMode="single"
          value={currentDate}
          onChange={(val) => setCurrentDate(val!)}
          renderLabel={handleCalendarData}
        />
      </div>

      {/* 打卡信息 */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        <Card title="上下班打卡（工时-）" extra="打卡规则：公司">
          <div style={{ padding: '12px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div>上班 · 自动</div>
                <div style={{ color: 'gray', fontSize: 12 }}>正常（08:27）</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>09:00</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>下班</div>
              <div style={{ color: '#ccc' }}>18:00</div>
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
