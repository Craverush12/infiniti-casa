export interface PropertyTheme {
  hex: string;
}

export function getPropertyTheme(propertyName: string): PropertyTheme {
  const name = propertyName.toLowerCase();
  if (name.includes('sky lounge')) return { hex: '#1F212E' };
  if (name.includes('little white bandra studio')) return { hex: '#3A4052' };
  if (name.includes('india house')) return { hex: '#BB3D3F' };
  if (name.includes('city zen')) return { hex: '#E89958' };
  if (name.includes('bandra cottage')) return { hex: '#A67939' };
  if (name.includes('afrohemian')) return { hex: '#587286' };
  if (name.includes('bandra art house')) return { hex: '#1C0B1D' };
  return { hex: '#0f766e' }; // fallback to a pleasant teal
}


