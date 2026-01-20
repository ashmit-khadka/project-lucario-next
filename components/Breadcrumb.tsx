'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    link: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = (props: BreadcrumbProps) => {
    return (
        <nav className="breadcrumb">
            <ul className="breadcrumb-list">
                {props.items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        <Link href={item.link} className="breadcrumb-link">
                            {item.label}
                        </Link>            
                        {index < props.items.length - 1 && <span className="breadcrumb-separator">{`>`}</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Breadcrumb;
