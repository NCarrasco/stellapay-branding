/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './login/index.html'],
  theme: {
    extend: {
      colors: {
        spPrimary: '#4F46E5',
        spPrimaryDark: '#4338CA',
        spPrimaryLight: '#818CF8',
        spSuccess: '#10B981',
        spWarning: '#F59E0B',
        spDanger: '#EF4444',
        spGray50: '#F9FAFB',
        spGray100: '#F3F4F6',
        spGray200: '#E5E7EB',
        spGray300: '#D1D5DB',
        spGray500: '#6B7280',
        spGray700: '#374151',
        spGray900: '#111827'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        panel: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        soft: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};
