export interface ButtonStyleProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-bold transition-colors motion-safe:transition-transform motion-safe:hover:-translate-y-0.5';
const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' };
const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-primary-soft text-primary hover:bg-surface-strong',
  ghost: 'border border-line bg-white text-ink hover:border-primary hover:text-primary',
};

/** Shared appearance for button links and native action buttons. */
export function buttonStyles({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) {
  return [base, sizes[size], variants[variant]].join(' ');
}
