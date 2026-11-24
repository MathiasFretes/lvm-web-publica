import type { CSSProperties } from 'react'

export function BrandIdentity({ color, accent }: { color?: string; accent?: string }) {
  return <span className="lvm-brand-identity" style={{ color } as CSSProperties}>
    <img src="/brand/lvm-circle.svg" alt="" className="lvm-brand-identity__emblem" />
    <span className="lvm-brand-identity__copy">
      <strong>La Voz <span style={{ color: accent }}>Misionera</span></strong>
      <small>Web Pública</small>
    </span>
  </span>
}
