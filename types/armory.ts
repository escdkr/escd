
import React from 'react';

export interface VIPAsset {
  id: string;
  code: string;
  title: string;
  type: 'CORE' | 'WEAPON' | 'SHIELD' | 'INTEL';
  tier: number; // For Tech Tree level
  desc: string;
  value: string;
  icon: React.ReactNode;
  parentId?: string; // For Tech Tree connections
}

export interface FreeAsset {
  id: string;
  title: string;
  category: string; // Changed from literal union to string to support Korean categories
  desc: string;
  volume: string; 
  views: number; 
  icon: React.ReactNode;
}

export interface ArmoryAsset {
  id: string;
  tier: 'FREE' | 'VIP';
  title: string;
  subtitle: string;
  type: string;
  icon: React.ReactNode;
  desc: string;
  highlight?: boolean; // New prop for Hero items
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  margin: string;
  note: string;
  status: 'OPEN' | 'VIP';
  type: 'DOMESTIC' | 'CHINA' | 'DROPSHIP';
}
