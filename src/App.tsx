/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, FileText, MapPin, Heart, PiggyBank, ArrowLeft, DollarSign, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DENOMINATIONS = [1000, 500, 100, 50, 20, 10];

const SAVINGS_DATA = [
  { year: '2026', value: 206 },
  { year: '2027', value: 206 },
  { year: '2028', value: 101488 },
  { year: '2029', value: 253320 },
  { year: '2030', value: 472721 },
  { year: '2031', value: 884527 },
  { year: '2032', value: 1016061 },
  { year: '2033', value: 1171978 },
  { year: '2034', value: 1252074 },
  { year: '2035', value: 1323611 },
  { year: '2036', value: 1419295 },
  { year: '2037', value: 1519882 },
  { year: '2038', value: 1627345 },
  { year: '2039', value: 1746275 },
  { year: '2040', value: 1872332 },
  { year: '2041', value: 2014524 },
  { year: '2042', value: 2168158 },
  { year: '2043', value: 2350676 },
  { year: '2044', value: 2535444 },
  { year: '2045', value: 2723872 },
  { year: '2046', value: 2978155 },
  { year: '2047', value: 3247208 },
  { year: '2048', value: 3546902 },
  { year: '2049', value: 3830195 },
  { year: '2050', value: 4137653 },
  { year: '2051', value: 4467238 },
  { year: '2052', value: 4816896 },
  { year: '2053', value: 5150432 },
  { year: '2054', value: 5495148 },
  { year: '2055', value: 5854771 }
].map(d => ({ ...d, indexedValue: Number(((d.value / 206) * 100).toFixed(2)) }));

const TECH_FUND_DATA = [
  { year: '2008', value: 25.75 },
  { year: '2009', value: 17.12 },
  { year: '2010', value: 28.02 },
  { year: '2011', value: 35.57 },
  { year: '2012', value: 37.16 },
  { year: '2013', value: 38.01 },
  { year: '2014', value: 47.04 },
  { year: '2015', value: 52.13 },
  { year: '2016', value: 48.05 },
  { year: '2017', value: 62.17 },
  { year: '2018', value: 86.97 },
  { year: '2019', value: 86.31 },
  { year: '2020', value: 98.10 },
  { year: '2021', value: 153.40 },
  { year: '2022', value: 150.11 },
  { year: '2023', value: 126.93 },
  { year: '2024', value: 192.15 },
  { year: '2025', value: 218.96 },
  { year: '2026', value: 283.54 }
].map(d => ({ ...d, indexedValue: Number(((d.value / 25.75) * 100).toFixed(2)) }));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-red-200 shadow-lg rounded-lg">
        <p className="font-bold text-red-800 mb-1">{label}年</p>
        <p className="text-red-600 font-semibold mb-1">
          指數 (Base 100): {payload[0].payload.indexedValue.toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm">
          預期回報: ${payload[0].payload.value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const TechTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-red-200 shadow-lg rounded-lg">
        <p className="font-bold text-red-800 mb-1">{label}年</p>
        <p className="text-emerald-600 font-semibold mb-1">
          指數 (Base 100): {payload[0].payload.indexedValue.toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm">
          基金價格: ${payload[0].payload.value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const [investmentTab, setInvestmentTab] = useState<'insurance' | 'tech'>('insurance');
  const [showTable, setShowTable] = useState(false);
  const [counts, setCounts] = useState<Record<number, number>>({
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
  });
  const [view, setView] = useState<'calculator' | 'report'>('calculator');

  const handleCountChange = (denom: number, value: string) => {
    const num = parseInt(value, 10);
    setCounts(prev => ({
      ...prev,
      [denom]: isNaN(num) ? 0 : Math.max(0, num)
    }));
  };

  const calculateTotal = () => {
    return DENOMINATIONS.reduce((sum, denom) => sum + denom * counts[denom], 0);
  };

  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-red-50 font-sans text-gray-900 selection:bg-red-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-yellow-400 p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-2">
          <DollarSign className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wider text-center">香港農曆新年利是計算機</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 pb-20">
        {view === 'calculator' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Calculator Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="bg-red-600 text-white p-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-bold">點算利是</h2>
              </div>
              <div className="p-4 space-y-3">
                {DENOMINATIONS.map(denom => (
                  <div key={denom} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100 hover:bg-red-50 transition-colors">
                    <div className="flex items-center gap-3 w-1/3">
                      <span className="text-xl font-bold text-red-700">${denom}</span>
                    </div>
                    <div className="flex items-center gap-2 w-1/3 justify-center">
                      <span className="text-gray-400 text-sm">x</span>
                      <input
                        type="number"
                        min="0"
                        value={counts[denom] || ''}
                        onChange={(e) => handleCountChange(denom, e.target.value)}
                        className="w-20 p-2 text-center text-lg font-semibold border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-sm">張</span>
                    </div>
                    <div className="w-1/3 text-right">
                      <span className="text-lg font-bold text-gray-800">
                        ${(denom * counts[denom]).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-400 flex justify-between items-center shadow-inner">
                  <span className="text-xl font-bold text-red-800">利是總數</span>
                  <span className="text-3xl font-black text-red-600">${totalAmount.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setView('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 font-bold text-lg py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <FileText className="w-6 h-6" />
                  生成入數報告
                </button>
              </div>
            </section>
          </div>
        ) : (
          /* Report View */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-700 to-red-600 text-yellow-400 p-6 text-center">
                <h2 className="text-3xl font-black tracking-wider">銀行入數報告</h2>
                <p className="text-red-100 mt-2 text-sm">請向銀行職員展示此畫面</p>
              </div>

              <div className="p-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-gray-500 text-lg">
                      <th className="pb-3 font-medium w-1/3">面額</th>
                      <th className="pb-3 font-medium text-center w-1/3">張數</th>
                      <th className="pb-3 font-medium text-right w-1/3">總額</th>
                    </tr>
                  </thead>
                  <tbody className="text-2xl font-bold text-gray-800">
                    {DENOMINATIONS.filter(d => counts[d] > 0).map(denom => (
                      <tr key={denom} className="border-b border-gray-100">
                        <td className="py-4 text-red-600">${denom}</td>
                        <td className="py-4 text-center">{counts[denom]}</td>
                        <td className="py-4 text-right">${(denom * counts[denom]).toLocaleString()}</td>
                      </tr>
                    ))}
                    {totalAmount === 0 && (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-gray-400 text-lg font-normal">
                          尚未輸入任何紙幣
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-4 border-red-600">
                      <td colSpan={2} className="pt-6 text-2xl font-black text-red-800">總計 (Grand Total)</td>
                      <td className="pt-6 text-3xl sm:text-4xl font-black text-red-600 text-right">${totalAmount.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>

                <button
                  onClick={() => {
                    setView('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full mt-10 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl py-4 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <ArrowLeft className="w-6 h-6" />
                  返回修改
                </button>
              </div>
            </div>

            {/* ATM Locations */}
            <section className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="bg-red-600 text-white p-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-bold">銀行存鈔機及分行位置</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-red-800 font-medium mb-4 bg-yellow-100 p-3 rounded-lg border border-yellow-300 flex items-center gap-2">
                  <span className="text-lg">💡</span> 滙豐銀行指定存鈔機支援 $20 及 $50 紙幣
                </p>
                <div className="space-y-5 mb-6">
                  <div>
                    <h3 className="font-bold text-red-700 border-b-2 border-red-100 pb-1 mb-2 inline-block">【港島】</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm ml-1">
                      <li>銅鑼灣理財易中心（銅鑼灣廣場二期地下G08鋪）</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 border-b-2 border-red-100 pb-1 mb-2 inline-block">【九龍】</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm ml-1">
                      <li>旺角理財易中心（旺角彌敦道673號LG樓）</li>
                      <li>尖沙咀理財易中心（尖沙咀彌敦道82-84號地下）</li>
                      <li>觀塘理財易中心（觀塘開源道71號王子大廈地下）</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 border-b-2 border-red-100 pb-1 mb-2 inline-block">【新界】</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm ml-1">
                      <li>屯門市廣場理財易中心（屯門市廣場第二期地下1號舖）</li>
                      <li>元朗理財易中心（元朗青山道150-160號匯豐大廈地下）</li>
                      <li>葵芳理財易中心（葵芳新都會廣場1樓153-160號舖）</li>
                      <li>荃灣理財易中心（荃灣青山道210號富華中心1樓4A、4B(A)-4B(C)、5及6號舖位）</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-red-100 pt-4">
                  <h3 className="font-bold text-red-800 mb-3">各大銀行分行及存鈔機搜尋：</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <a href="https://www.hsbc.com.hk/zh-hk/branch-finder/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      滙豐銀行 HSBC
                    </a>
                    <a href="https://www.bochk.com/tc/branch.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      中銀香港 BOCHK
                    </a>
                    <a href="https://www.hangseng.com/zh-hk/contact-us/branch-locator/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      恒生銀行 Hang Seng
                    </a>
                    <a href="https://www.sc.com/hk/zh/atm-branch-locator/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      渣打銀行 Standard Chartered
                    </a>
                    <a href="https://www.hkbea.com/html/tc/bea-branches-locations.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      東亞銀行 BEA
                    </a>
                    <a href="https://www.dbs.com.hk/index-zh/locator.page?pid=hk-personal-zh-global-header-textlink-branch" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-sm text-gray-700 hover:text-red-700 transition-colors font-medium">
                      星展銀行 DBS
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Charity */}
            <section className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="bg-red-600 text-white p-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-bold">分享祝福：支持慈善機構</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: '香港耀能協會', url: 'https://www.sahk1963.org.hk/b5_support_2.php' },
                    { name: '毛守', url: 'https://www.pgrs.life/donation/' },
                    { name: '龜途', url: 'https://www.facebook.com/100077089665920/photos/' },
                    { name: '癌症基金會', url: 'https://www.cancer-fund.org/one-off-and-cof-donation/?select=one-off' },
                    { name: '兒童癌病基金', url: 'https://www.ccf.org.hk/zh-hant/support/donation/childrens_cancer_foundation/online_donation/' },
                    { name: '香港流浪狗之家', url: 'https://www.hkhomelessdogsl.org.hk/donate' },
                    { name: '拯救貓狗協會', url: 'https://hkscda.com/donation' }
                  ].map((charity, i) => (
                    <a key={i} href={charity.url} target="_blank" rel="noopener noreferrer" className="block bg-red-50 text-red-800 font-medium p-3 rounded-lg text-center border border-red-100 text-sm hover:bg-red-100 transition-colors">
                      {charity.name}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Kids Financial Education */}
            <section className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="bg-red-600 text-white p-4 flex items-center gap-2">
                <PiggyBank className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-bold">幫小朋友儲利是錢</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    「唔好俾通脹令金錢貶值！善用利是錢為小朋友建立未來。」
                  </p>
                </div>
                <div className="flex gap-3 items-start bg-red-50 p-4 rounded-xl border border-red-100">
                  <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <div className="flex border-b border-red-200 mb-4">
                      <button
                        onClick={() => setInvestmentTab('insurance')}
                        className={`pb-2 px-4 text-sm font-bold transition-colors ${investmentTab === 'insurance' ? 'text-red-700 border-b-2 border-red-700' : 'text-red-400 hover:text-red-600'}`}
                      >
                        保險儲蓄
                      </button>
                      <button
                        onClick={() => setInvestmentTab('tech')}
                        className={`pb-2 px-4 text-sm font-bold transition-colors ${investmentTab === 'tech' ? 'text-red-700 border-b-2 border-red-700' : 'text-red-400 hover:text-red-600'}`}
                      >
                        科技基金
                      </button>
                    </div>

                    {investmentTab === 'insurance' ? (
                      <div className="animate-in fade-in duration-300">
                        <h4 className="font-bold text-red-800">模擬保險儲蓄計劃回報</h4>
                        <p className="text-gray-700 text-sm mt-1 mb-4 leading-relaxed">
                          首16年預期回報 <span className="font-bold text-red-600">4.5%</span>，期後每年 <span className="font-bold text-red-600">6.5%</span>
                        </p>

                        <div className="h-64 w-full bg-white p-2 rounded-lg border border-red-100">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={SAVINGS_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                              <XAxis
                                dataKey="year"
                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                tickMargin={10}
                                minTickGap={20}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                                axisLine={false}
                                tickLine={false}
                                width={50}
                              />
                              <Tooltip content={<CustomTooltip />} />
                              <Line
                                type="monotone"
                                dataKey="indexedValue"
                                stroke="#dc2626"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, fill: '#dc2626', stroke: '#fff', strokeWidth: 2 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => setShowTable(!showTable)}
                            className="flex items-center justify-center w-full py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                          >
                            {showTable ? (
                              <><ChevronUp className="w-4 h-4 mr-1" /> 隱藏詳細數據</>
                            ) : (
                              <><ChevronDown className="w-4 h-4 mr-1" /> 顯示詳細數據</>
                            )}
                          </button>

                          {showTable && (
                            <div className="mt-2 max-h-40 overflow-y-auto bg-white rounded-lg border border-red-100 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                              <table className="w-full text-left">
                                <thead className="bg-red-50 sticky top-0">
                                  <tr>
                                    <th className="p-2 font-medium text-red-800">年份</th>
                                    <th className="p-2 font-medium text-red-800 text-right">指數 (Base 100)</th>
                                    <th className="p-2 font-medium text-red-800 text-right">預期回報</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {SAVINGS_DATA.map((row, i) => (
                                    <tr key={row.year} className={i % 2 === 0 ? 'bg-white' : 'bg-red-50/30'}>
                                      <td className="p-2 text-gray-600">1-3-{row.year}</td>
                                      <td className="p-2 text-right font-medium text-red-600">{row.indexedValue.toLocaleString()}</td>
                                      <td className="p-2 text-right font-medium text-gray-800">${row.value.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="animate-in fade-in duration-300">
                        <h4 className="font-bold text-red-800">科技基金過去18年表現</h4>
                        <p className="text-gray-700 text-sm mt-1 mb-4 leading-relaxed">
                          歷史數據參考 (2008-2026)，累計回報達 <span className="font-bold text-red-600">1001%</span> (年化回報約 14.3%)
                        </p>

                        <div className="h-64 w-full bg-white p-2 rounded-lg border border-red-100">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TECH_FUND_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                              <XAxis
                                dataKey="year"
                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                tickMargin={10}
                                minTickGap={10}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                tickFormatter={(value) => value}
                                axisLine={false}
                                tickLine={false}
                                width={40}
                              />
                              <Tooltip content={<TechTooltip />} />
                              <Line
                                type="monotone"
                                dataKey="indexedValue"
                                stroke="#059669"
                                strokeWidth={3}
                                dot={{ r: 3, fill: '#059669', strokeWidth: 0 }}
                                activeDot={{ r: 6, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => setShowTable(!showTable)}
                            className="flex items-center justify-center w-full py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                          >
                            {showTable ? (
                              <><ChevronUp className="w-4 h-4 mr-1" /> 隱藏詳細數據</>
                            ) : (
                              <><ChevronDown className="w-4 h-4 mr-1" /> 顯示詳細數據</>
                            )}
                          </button>

                          {showTable && (
                            <div className="mt-2 max-h-40 overflow-y-auto bg-white rounded-lg border border-emerald-100 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                              <table className="w-full text-left">
                                <thead className="bg-emerald-50 sticky top-0">
                                  <tr>
                                    <th className="p-2 font-medium text-emerald-800">年份 (約2月底)</th>
                                    <th className="p-2 font-medium text-emerald-800 text-right">指數 (Base 100)</th>
                                    <th className="p-2 font-medium text-emerald-800 text-right">基金價格 (美元)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {TECH_FUND_DATA.map((row, i) => (
                                    <tr key={row.year} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                                      <td className="p-2 text-gray-600">{row.year}</td>
                                      <td className="p-2 text-right font-medium text-emerald-600">{row.indexedValue.toFixed(2)}</td>
                                      <td className="p-2 text-right font-medium text-gray-800">${row.value.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
