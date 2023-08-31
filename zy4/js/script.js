// 初始化 ECharts 实例
var myChart = echarts.init(document.getElementById('chart-container'));

// 柱形图的样式和配置
var option = {
  title: {
    text: '月销售额'
  },
  tooltip: {},
  legend: {
    data:['销售额']
  },
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  yAxis: {},
  series: [{
    name: '销售额',
    type: 'bar',
    data: [100, 200, 300, 400, 500, 600],
    label: {
      show: true,
      position: 'top'
    },
    itemStyle: {
      color: '#c23531'
    }
  }]
};

// 加载数据并渲染柱形图
myChart.setOption(option);

// 实现排序功能
document.getElementById('sort').addEventListener('click', function() {
  var data = option.series[0].data;
  data.sort(function(a, b) {
    return a - b;
  });
  option.series[0].data = data;
  myChart.setOption(option);
});

// 实现筛选功能
document.getElementById('filter').addEventListener('click', function() {
  var data = option.series[0].data;
  var newData = data.filter(function(item) {
    return item > 300;
  });
  option.xAxis.data = ["3月","4月","5月","6月"];
  option.series[0].data = newData;
  myChart.setOption(option);
});

// 实现添加数据标签和表格功能
document.getElementById('add-label').addEventListener('click', function() {
  var data = option.series[0].data;
  for (var i = 0; i < data.length; i++) {
    option.series[0].label.formatter = function(params) {
      return params.value + '\n' + '（' + params.name + '）';
    };
  }
  myChart.setOption(option);
});

document.getElementById('add-table').addEventListener('click', function() {
  var data = option.series[0].data;
  var table = '<table><thead><tr><th>月份</th><th>销售额</th></tr></thead><tbody>';
  for (var i = 0; i < data.length; i++) {
    table += '<tr><td>' + (i + 1) + '月' + '</td><td>' + data[i] + '</td></tr>';
  }
  table += '</tbody></table>';
  document.getElementById('table-container').innerHTML = table;
});
