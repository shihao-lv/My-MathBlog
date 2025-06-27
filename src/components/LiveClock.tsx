import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// 导出一个名为LiveClock的函数组件
export const LiveClock: React.FC = () => {
  // 使用useState钩子创建一个名为currentTime的状态变量，初始值为当前时间
  const [currentTime, setCurrentTime] = useState(new Date());

  // 使用useEffect钩子创建一个定时器，每秒更新一次currentTime
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 组件卸载时清除定时器
    return () => clearInterval(timer);
  }, []);

  // 格式化时间函数，将时间格式化为中文
  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long'
    });
  };

  // 返回一个包含当前时间的div元素
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900 academic-sans">当前时间</h3>
      </div>
      <div className="font-mono text-sm text-gray-700">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};  // 创建一个数组，用于存储渲染后的文本和数学公式
