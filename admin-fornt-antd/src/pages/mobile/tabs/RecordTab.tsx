import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RecordTab: React.FC = () => {
  const data = [
    { name: '周一', value: 2 },
    { name: '周二', value: 4 },
    { name: '周三', value: 3 },
    { name: '周四', value: 5 },
    { name: '周五', value: 1 },
  ];

  return (
    <div style={{ height: 300, padding: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1677ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecordTab;
