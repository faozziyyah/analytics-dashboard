export const cards = [
    { id: 'revenue', title: 'Revenue', value: '₦1,234,567' },
    { id: 'transactions', title: 'Transactions', value: '4,321' },
    { id: 'conversion', title: 'Conversion Rate', value: '3.2%' }
];


export const timeseries = Array.from({ length: 12 }).map((_, i) => ({
    month: `M${i + 1}`,
    value: Math.round(1000 + Math.random() * 5000)
}));

export const summaryCards = [
  { title: "Total Number of Users Tickets", value: "109,828", change: "+11.9%" },
  { title: "Total Open Tickets", value: "2,910", change: "-3.4%" },
  { title: "Total Closed Tickets", value: "109,291", change: "+7.8%" },
  { title: "Total Due Tickets", value: "34", change: "-2.1%" },
];

export const lineData = [
  { month: "Jan", Tickets: 400, Closed: 240 },
  { month: "Feb", Tickets: 300, Closed: 139 },
  { month: "Mar", Tickets: 200, Closed: 980 },
  { month: "Apr", Tickets: 278, Closed: 390 },
  { month: "May", Tickets: 189, Closed: 480 },
  { month: "Jun", Tickets: 239, Closed: 380 },
  { month: "Jul", Tickets: 349, Closed: 430 },
];

export const barData = [
  { name: "Jan", Open: 400, Closed: 240 },
  { name: "Feb", Open: 300, Closed: 139 },
  { name: "Mar", Open: 200, Closed: 980 },
  { name: "Apr", Open: 278, Closed: 390 },
  { name: "May", Open: 189, Closed: 480 },
  { name: "Jun", Open: 239, Closed: 380 },
  { name: "Jul", Open: 349, Closed: 430 },
];

export const pieData = [
  { name: "Critical", value: 400 },
  { name: "High", value: 300 },
  { name: "Medium", value: 300 },
  { name: "Low", value: 200 },
];
