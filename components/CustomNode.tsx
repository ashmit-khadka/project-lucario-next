import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }: { data: any }) {
  return (
    <div
      style={{
        padding: '10px 20px',
        backgroundColor: '#ffc4e7',
        border: '2px solid #580081',
        borderRadius: '8px',
        color: '#580081',
        fontWeight: 'bold',
        fontFamily: '"DM Mono", monospace',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        minWidth: '100px',
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#580081' }} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#580081' }} />
    </div>
  );
}
