import React, { useRef, useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { ReactFlow, Background, Controls, MiniMap, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, useScroll, useTransform } from 'framer-motion';
import CustomNode from './CustomNode';
import formatText from '../utils/formatText';

interface VisualizationBlockProps {
    data: {
        title?: string;
        visType: 'bar-chart' | 'line-chart' | 'flowchart' | 'pie-chart' | 'radar-chart' | 'area-chart' | 'stacked-bar' | 'timeline' | 'scatter-plot' | 'heatmap' | 'venn-diagram' | 'gantt-chart' | 'layer-diagram' | 'code-diff' | 'tree-diagram';
        data: any;
        height?: number;
    }
}

const VisualizationBlock: React.FC<VisualizationBlockProps> = ({ data }) => {
    const { title, visType, data: visData, height = 400 } = data;

    const containerRef = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(800);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "start 40%"]
    });

    const contractedWidth = Math.min(800, windowWidth - 48);
    const expandedWidth = Math.min(1600, windowWidth - 48);
    const contractedRadius = windowWidth >= 800 ? 48 : 0;
    const expandedRadius = windowWidth >= 800 ? 24 : 0;

    const width = useTransform(scrollYProgress, [0, 1], [contractedWidth, expandedWidth]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [contractedRadius, expandedRadius]);

    // Dark Mode Colors
    const colorLine = "#C1ABCC"; // Lighter purple for primary data lines
    const colorGrid = "#3C1F4A"; // Dark purple for grids so it blends in
    const colorText = "#fef0ff"; // Off-white text
    const colorTooltipBg = "#250036";
    const colorBg = "transparent";

    const isFlowchart = visType === 'flowchart' || visType === 'tree-diagram';

    // Flowchart Colors (Light Theme content on Dark Background #250036f2)
    const flowchartColorLine = "#C1ABCC"; // Lighter purple for primary lines on dark background
    const flowchartColorGrid = "rgba(193, 171, 204, 0.15)"; // subtle grid dots
    const flowchartColorText = "#580081"; // default dark purple font color (for text inside nodes/labels)
    const flowchartColorTooltipBg = "#FFFFFF"; // white tooltip/label bg
    const flowchartColorBg = "transparent";

    const renderChart = () => {
        switch (visType) {
            case 'bar-chart':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <BarChart data={visData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis dataKey="name" stroke={colorText} />
                            <YAxis stroke={colorText} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ color: colorText }} />
                            <Bar dataKey="value" fill={colorLine} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'line-chart':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <LineChart data={visData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis dataKey="name" stroke={colorText} />
                            <YAxis stroke={colorText} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ color: colorText }} />
                            <Line type="monotone" dataKey="value" stroke={colorLine} activeDot={{ r: 8, fill: '#E2D1ED' }} strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'flowchart': {
                const displayNodes = (visData.nodes || []).map((node: any) => ({
                    ...node,
                    type: 'custom',
                }));

                const displayEdges = (visData.edges || []).map((edge: any) => ({
                    ...edge,
                    style: { stroke: flowchartColorLine, strokeWidth: 2, ...edge.style },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: flowchartColorLine,
                    },
                    labelBgPadding: [8, 4],
                    labelBgBorderRadius: 4,
                    labelBgStyle: { fill: flowchartColorTooltipBg, color: flowchartColorText, stroke: colorGrid, strokeWidth: 2 },
                    labelStyle: { fill: flowchartColorText, fontWeight: 700, fontSize: 12, fontFamily: '"DM Mono", monospace' },
                }));

                const nodeTypes = { custom: CustomNode };

                return (
                    <div style={{ width: '100%', height: height * 1.5, border: 'none', borderRadius: '8px', overflow: 'hidden', backgroundColor: flowchartColorBg, position: 'relative' }}>
                        <ReactFlow
                            nodes={displayNodes}
                            edges={displayEdges}
                            nodeTypes={nodeTypes}
                            style={{ backgroundColor: '#580081' }}
                            fitView
                            colorMode="light"
                        >
                            <Background color={flowchartColorGrid} gap={16} />
                            <Controls style={{ fill: colorText, backgroundColor: colorTooltipBg }} />
                            <MiniMap 
                                nodeColor="#580081"
                                nodeStrokeWidth={3}
                                zoomable
                                pannable
                                style={{ border: `2px solid #ffc4e781`, borderRadius: '8px', backgroundColor: '#FFF8EE' }}
                                maskColor="rgba(0, 0, 0, 0.2)"
                            />
                        </ReactFlow>
                    </div>
                );
            }
            case 'pie-chart': {
                const COLORS = ['#E2D1ED', '#C1ABCC', '#9B7AAD', '#580081', '#3C1F4A'];
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <PieChart>
                            <Pie data={visData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" stroke={colorTooltipBg}>
                                {visData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ color: colorText }} />
                        </PieChart>
                    </ResponsiveContainer>
                );
            }
            case 'radar-chart':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={visData}>
                            <PolarGrid stroke={colorGrid} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: colorText }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={colorGrid} tick={{ fill: colorText }} />
                            <Radar name="Score" dataKey="value" stroke={colorLine} fill={colorLine} fillOpacity={0.6} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                );
            case 'area-chart':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <AreaChart data={visData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colorLine} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={colorLine} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis dataKey="name" stroke={colorText} />
                            <YAxis stroke={colorText} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="value" stroke={colorLine} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case 'stacked-bar': {
                const keys = visData.length > 0 ? Object.keys(visData[0]).filter(k => k !== 'name') : [];
                const COLORS = ['#E2D1ED', '#C1ABCC', '#9B7AAD', '#580081', '#3C1F4A'];
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <BarChart data={visData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis dataKey="name" stroke={colorText} />
                            <YAxis stroke={colorText} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ color: colorText }} />
                            {keys.map((key, index) => (
                                <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
            case 'timeline': {
                return (
                    <div style={{ padding: '20px', backgroundColor: colorBg, borderRadius: '8px', border: `1px solid ${colorGrid}`, height: height, overflowY: 'auto' }}>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: 0, position: 'relative' }}>
                            <motion.div 
                                initial={{ height: 0 }} 
                                whileInView={{ height: '100%' }} 
                                viewport={{ once: true }}
                                transition={{ duration: 1 }} 
                                style={{ position: 'absolute', left: '15px', top: '0', width: '2px', backgroundColor: colorLine }} 
                            />
                            {visData.map((item: any, i: number) => (
                                <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (i * 0.2), duration: 0.4 }}
                                    style={{ position: 'relative', margin: '20px 0', paddingLeft: '40px' }}>
                                    <div style={{ position: 'absolute', left: '9px', top: '5px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: colorText, border: `3px solid ${colorLine}` }} />
                                    <h4 style={{ margin: '0 0 5px 0', color: colorText }}>{item.title}</h4>
                                    <p style={{ margin: 0, color: '#C1ABCC' }}>{item.description}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                );
            }
            case 'scatter-plot':
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis dataKey="x" type="number" stroke={colorText} name="X" />
                            <YAxis dataKey="y" type="number" stroke={colorText} name="Y" />
                            <ZAxis dataKey="z" type="number" range={[60, 400]} name="Volume" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ color: colorText }} />
                            <Scatter name="Data" data={visData} fill={colorLine} />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
            case 'heatmap': {
                return (
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visData.cols || 7}, 1fr)`, gap: '4px', width: '100%', height: height, backgroundColor: colorBg, padding: '10px', borderRadius: '8px', border: `1px solid ${colorGrid}`, overflowY: 'auto' }}>
                        {visData.cells.map((cell: any, i: number) => {
                            const intensity = cell.value || 0;
                            return (
                                <motion.div 
                                    key={i} 
                                    title={cell.label} 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 0.1 + (intensity * 0.9), scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.02, duration: 0.3 }}
                                    style={{
                                        backgroundColor: colorLine,
                                        borderRadius: '4px',
                                        height: '100%',
                                        minHeight: '30px'
                                    }} 
                                />
                            );
                        })}
                    </div>
                );
            }
            case 'venn-diagram': {
                return (
                    <div style={{ position: 'relative', width: '100%', height: height, backgroundColor: colorBg, borderRadius: '8px', border: `1px solid ${colorGrid}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(226, 209, 237, 0.4)', left: 'calc(50% - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '30px', color: colorText, fontWeight: 'bold' }}>
                            {visData.leftLabel}
                        </motion.div>
                        <motion.div 
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(193, 171, 204, 0.4)', right: 'calc(50% - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '30px', color: colorText, fontWeight: 'bold', mixBlendMode: 'screen' }}>
                            {visData.rightLabel}
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            style={{ zIndex: 10, color: '#fff', fontWeight: 'bold', textAlign: 'center', maxWidth: '120px' }}>
                            {visData.intersectionLabel}
                        </motion.div>
                    </div>
                );
            }
            case 'gantt-chart': {
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <BarChart data={visData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.5} stroke={colorGrid} />
                            <XAxis type="number" stroke={colorText} />
                            <YAxis dataKey="name" type="category" stroke={colorText} />
                            <Tooltip contentStyle={{ backgroundColor: colorTooltipBg, color: colorText, borderColor: colorGrid, borderRadius: '8px' }} />
                            <Bar dataKey="start" stackId="a" fill="transparent" />
                            <Bar dataKey="duration" stackId="a" fill={colorLine} radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
            case 'layer-diagram': {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', justifyContent: 'center', width: '100%', height: height, backgroundColor: colorBg, borderRadius: '8px', border: `1px solid ${colorGrid}`, padding: '20px', overflowY: 'auto' }}>
                        {visData.map((layer: any, i: number) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                style={{ width: '80%', padding: '20px', backgroundColor: i % 2 === 0 ? '#E2D1ED' : '#580081', color: i % 2 === 0 ? '#250036' : colorText, textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', fontWeight: 'bold', border: i % 2 === 0 ? 'none' : `2px solid ${colorLine}` }}>
                                {layer.title}
                            </motion.div>
                        ))}
                    </div>
                );
            }
            case 'code-diff': {
                return (
                    <div style={{ display: 'flex', gap: '20px', width: '100%', height: height, overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', border: `1px solid ${colorGrid}`, borderRadius: '8px' }}>
                            <div style={{ backgroundColor: '#cc0000', color: '#fff', padding: '5px 10px', fontWeight: 'bold' }}>❌ Bad Approach</div>
                            <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#2a2139' }}>
                                <SyntaxHighlighter language={visData.language || 'javascript'} style={synthwave84} customStyle={{ margin: 0, height: '100%', borderRadius: 0, backgroundColor: 'transparent' }}>
                                    {visData.badCode}
                                </SyntaxHighlighter>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', border: `1px solid ${colorGrid}`, borderRadius: '8px' }}>
                            <div style={{ backgroundColor: '#006600', color: '#fff', padding: '5px 10px', fontWeight: 'bold' }}>✅ Good Approach</div>
                            <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#2a2139' }}>
                                <SyntaxHighlighter language={visData.language || 'javascript'} style={synthwave84} customStyle={{ margin: 0, height: '100%', borderRadius: 0, backgroundColor: 'transparent' }}>
                                    {visData.goodCode}
                                </SyntaxHighlighter>
                            </div>
                        </motion.div>
                    </div>
                );
            }
            case 'tree-diagram': {
                const displayNodes = (visData.nodes || []).map((node: any) => ({
                    ...node,
                    type: 'custom',
                }));

                const displayEdges = (visData.edges || []).map((edge: any) => ({
                    ...edge,
                    type: 'smoothstep',
                    style: { stroke: flowchartColorLine, strokeWidth: 2, ...edge.style },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: flowchartColorLine,
                    },
                }));

                const nodeTypes = { custom: CustomNode };

                return (
                    <div style={{ width: '100%', height: height * 1.5, border: 'none', borderRadius: '8px', overflow: 'hidden', backgroundColor: flowchartColorBg, position: 'relative' }}>
                        <ReactFlow
                            nodes={displayNodes}
                            edges={displayEdges}
                            nodeTypes={nodeTypes}
                            style={{ backgroundColor: '#580081' }}
                            fitView
                            colorMode="light"
                            nodesDraggable={false}
                        >
                            <Background color={flowchartColorGrid} gap={16} />
                            <Controls style={{ fill: colorText, backgroundColor: colorTooltipBg }} />
                        </ReactFlow>
                    </div>
                );
            }
            default:
                return <p style={{ color: colorText }}>Unsupported visualization type: {visType}</p>;
        }
    };

    return (
        <motion.div 
            ref={containerRef}
            className={`visualization-block ${isFlowchart ? 'flowchart-block' : ''}`}
            style={{ 
                margin: '2rem 0', 
                fontFamily: '"DM Mono", monospace',
                width: width,
                marginLeft: "50%",
                x: "-50%",
                borderRadius: borderRadius,
                overflow: 'hidden',
                backgroundColor: isFlowchart ? '#580081' : '#250036',
                color: '#fef0ff',
                padding: '2rem'
            }}>
            {title && <h4 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#fef0ff' }}>{formatText(title)}</h4>}
            {renderChart()}
        </motion.div>
    );
};

export default VisualizationBlock;
