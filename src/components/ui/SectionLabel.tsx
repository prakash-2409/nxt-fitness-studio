interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.2em',
        color: '#666666',
        textTransform: 'uppercase',
        borderLeft: '1px solid #F5C400',
        paddingLeft: 12,
      }}
      className="cursor-blink"
    >
      <span>[ SEC_{index} / {label} ]</span>
    </div>
  );
}
