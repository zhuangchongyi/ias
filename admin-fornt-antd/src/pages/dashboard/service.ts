import mockFakeChartData from './_mock';
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return mockFakeChartData();
}
