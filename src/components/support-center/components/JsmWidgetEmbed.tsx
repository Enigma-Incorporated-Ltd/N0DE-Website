import { useEffect, useRef } from 'react';

const JSM_WIDGET_KEY = '30c83744-de8c-45b9-a402-28d0a2bb0344';
const JSM_BASE_URL = 'https://jsd-widget.atlassian.com';
const JSM_SCRIPT_ID = 'jsd-widget-embed';

/**
 * JSM (Jira Service Management) Widget Embed
 * Loads the Atlassian JSD widget script for support/help desk functionality.
 * Only loads once per page — safe to mount/unmount.
 */
const JsmWidgetEmbed = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    if (document.getElementById(JSM_SCRIPT_ID)) return;

    loadedRef.current = true;
    const script = document.createElement('script');
    script.id = JSM_SCRIPT_ID;
    script.setAttribute('data-jsd-embedded', '');
    script.setAttribute('data-key', JSM_WIDGET_KEY);
    script.setAttribute('data-base-url', JSM_BASE_URL);
    script.src = `${JSM_BASE_URL}/assets/embed.js`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const el = document.getElementById(JSM_SCRIPT_ID);
      if (el?.parentNode) {
        el.parentNode.removeChild(el);
      }
      loadedRef.current = false;
    };
  }, []);

  return null;
};

export default JsmWidgetEmbed;
