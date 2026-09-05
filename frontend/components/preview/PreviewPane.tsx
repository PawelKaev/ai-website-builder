'use client';

interface PreviewPaneProps {
  html: string;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}

export function PreviewPane({ html, deviceMode }: PreviewPaneProps) {
  const deviceStyles = {
    desktop: { width: '100%', maxWidth: '100%' },
    tablet: { width: '768px', maxWidth: '100%' },
    mobile: { width: '375px', maxWidth: '100%' }
  };

  return (
    <div className="preview-pane h-full bg-white">
      <iframe
        srcDoc={html}
        style={deviceStyles[deviceMode]}
        className="h-full mx-auto border-0"
        sandbox="allow-scripts"
        title="Предпросмотр сайта"
      />
    </div>
  );
}
