import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Briefcase, CalendarDays, TrendingUp, 
  UserCheck, ArrowUp, ArrowDown 
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../../components/common/Card';
import PageHeader from '../../components/common/PageHeader';
import dashboardService from '../../services/dashboardService';
import { DashboardStats } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [placementData, setPlacementData] = useState<{ month: string; count: number }[]>([]);
  const [topCompanies, setTopCompanies] = useState<{ company: string; placements: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, placementsData, companiesData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getPlacementData(),
          dashboardService.getTopCompanies(),
        ]);
        
        setStats(statsData);
        setPlacementData(placementsData);
        setTopCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    change, 
    changeText, 
    positive = true 
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ReactNode; 
    change?: number; 
    changeText?: string;
    positive?: boolean;
  }) => (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
      
      {change !== undefined && changeText && (
        <div className="mt-4 flex items-center">
          {positive ? (
            <ArrowUp size={16} className="text-green-500 mr-1" />
          ) : (
            <ArrowDown size={16} className="text-red-500 mr-1" />
          )}
          <span className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change}% {changeText}
          </span>
        </div>
      )}
    </Card>
  );

  // Sample mock data for charts
  const lineChartData = {
    labels: placementData.map(data => data.month) || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Placements',
        data: placementData.map(data => data.count) || [5, 8, 12, 15, 22, 30],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const doughnutChartData = {
    labels: ['Placed', 'Not Placed'],
    datasets: [
      {
        data: stats ? [stats.placedStudents, stats.totalStudents - stats.placedStudents] : [65, 35],
        backgroundColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
        borderWidth: 0,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome to the Placement Cell Dashboard"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value={stats?.totalStudents || 156}
          icon={<Users size={24} className="text-blue-600" />}
          change={8.2}
          changeText="since last month"
          positive={true}
        />
        
        <StatCard 
          title="Total Companies" 
          value={stats?.totalCompanies || 42}
          icon={<Building2 size={24} className="text-indigo-600" />}
          change={12.5}
          changeText="since last month"
          positive={true}
        />
        
        <StatCard 
          title="Open Jobs" 
          value={stats?.totalJobs || 89}
          icon={<Briefcase size={24} className="text-green-600" />}
          change={5.1}
          changeText="since last month"
          positive={true}
        />
        
        <StatCard 
          title="Upcoming Interviews" 
          value={stats?.upcomingInterviews || 35}
          icon={<CalendarDays size={24} className="text-orange-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Placement Trends</h3>
            <div className="flex items-center">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +15% this year
              </span>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={lineChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Placement Status</h3>
            <div className="flex items-center">
              <UserCheck size={16} className="text-blue-500 mr-1" />
              <span className="text-sm text-blue-600">
                {stats?.placementRate || 65}% placed
              </span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={doughnutChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>

      {/* Top Companies */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Top Recruiting Companies</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Package (LPA)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(topCompanies.length > 0 ? topCompanies : [
                { company: 'Microsoft', placements: 12 },
                { company: 'Google', placements: 8 },
                { company: 'Amazon', placements: 7 },
                { company: 'TCS', placements: 6 },
                { company: 'Infosys', placements: 5 },
              ]).map((company, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{company.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.placements}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{(Math.random() * 20 + 5).toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index % 2 === 0 ? (
                        <ArrowUp size={16} className="text-green-500 mr-1" />
                      ) : (
                        <ArrowDown size={16} className="text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(Math.random() * 10 + 1).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;