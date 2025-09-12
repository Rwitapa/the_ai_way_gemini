import React from 'react';

// --- SHARED ICON COMPONENT ---
// This component is a production-ready best practice for managing SVG icons.
// By centralizing all icons here, we achieve:
// 1.  Consistency: All icons are handled in the same way.
// 2.  Maintainability: To add, remove, or update an icon, you only need to edit this one file.
// 3.  Performance: Inlines SVGs directly, avoiding extra network requests for image files.
// 4.  Reusability: Any component can easily use any icon with a simple prop.

// To use: <Icon name="icon-name" size={24} className="text-white" />

const Icon = ({ name, size = 24, className = '', strokeWidth = 2 }) => {
    const iconProps = {
        width: size,
        height: size,
        className,
        strokeWidth,
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    };

    const icons = {
        'menu': <svg {...iconProps}><path d="M3 12h18M3 6h18M3 18h18" /></svg>,
        'x': <svg {...iconProps}><path d="M18 6L6 18M6 6l12 12" /></svg>,
        'linkedin': <svg {...iconProps} fill="currentColor" stroke="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
        'instagram': <svg {...iconProps}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
        'check-circle': <svg {...iconProps}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        'check': <svg {...iconProps}><polyline points="20 6 9 17 4 12"></polyline></svg>,
        'whatsapp': <svg {...iconProps} fill="currentColor" stroke="none"><path d="M16.75 13.96c.25.13.42.2.42.58c0 .42-.21.8-.46 1.05c-.25.25-.83.38-1.17.25c-.34-.12-1.42-.63-2.71-1.82c-1.03-.96-1.71-2.14-1.96-2.52c-.25-.38-.04-.58.17-.79c.2-.21.42-.25.58-.25s.25.04.38.17c.12.12.16.2.2.25c.04.04.04.08.08.17c.04.08.04.12.04.17c0 .08-.04.21-.08.33c-.04.13-.08.17-.12.21c-.04.04-.08.08-.12.12c-.04.04-.08.08-.08.08c-.04.04-.04.04 0 0c.08.17.42.75.96 1.29c.54.54 1.12.87 1.29.96c0 0 .04.04.08.04c.04 0 .08-.04.12-.08c.04-.04.08-.08.12-.12c.04-.04.08-.08.17-.12c.08-.04.21-.08.33-.08s.12 0 .17.04c.04.04.08.08.12.12c.04.04.08.08.12.12s.13.08.17.12c.04.04.08.13.12.17c.04.04.08.13.12.17c.04.04.08.12.12.17zm-8.33-12.38a10.03 10.03 0 0 0-7.46 16.94l-1.63 5.95l6.08-1.6a10.03 10.03 0 0 0 15.9-13.83a10.03 10.03 0 0 0-12.89-7.46zm0 18.66a8.47 8.47 0 0 1-4.29-1.17l-.3-.17l-3.17.83l.87-3.1l-.2-.3a8.47 8.47 0 0 1-1.33-4.54a8.47 8.47 0 0 1 12.92-7.16a8.47 8.47 0 0 1 2.46 12.92a8.47 8.47 0 0 1-7 2.45z" /></svg>,
        'arrow-left': <svg {...iconProps}><path d="M19 12H5m7 7l-7-7 7-7" /></svg>,
        'arrow-right': <svg {...iconProps}><path d="M5 12h14m-7-7l7 7-7 7" /></svg>,
        'bar-chart-2': <svg {...iconProps}><path d="M18 20V10m-6 10V4M6 20v-6" /></svg>,
        'clock': <svg {...iconProps}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
        'calendar': <svg {...iconProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
        'shield-check': <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>,
        'bolt': <svg {...iconProps}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
        'file-text': <svg {...iconProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
        'tool': <svg {...iconProps}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
        'rocket': <svg {...iconProps}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.0-3.1-.7-.8-2.27-.81-3.1-.01zM21 3c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.0-3.1-.7-.8-2.27-.81-3.1-.01zM4.5 4.5l12 12" /></svg>,
        'git-fork': <svg {...iconProps}><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1.5a3.5 3.5 0 0 1-7 0V9m-4.5 4.5a3.5 3.5 0 0 0 0 7V9" /></svg>,
        'compass': <svg {...iconProps}><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
        'plus': <svg {...iconProps}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
        'play-circle': <svg {...iconProps}><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>,
        'award': <svg {...iconProps}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline></svg>,
        'user': <svg {...iconProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
        'book': <svg {...iconProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
        'user-check': <svg {...iconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
        'square-check': <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>,
    };

    return icons[name] || null;
};

export default Icon;
