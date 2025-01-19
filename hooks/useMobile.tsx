import { useState, useEffect } from 'react';

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if device is mobile/tablet
    const checkMobile = () => {
      // Check if userAgent indicates mobile device
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords =
        /(android|webos|iphone|ipad|ipod|blackberry|windows phone)/i;

      // Check both screen width and userAgent
      const isMobileDevice =
        window.innerWidth < 768 || mobileKeywords.test(userAgent);

      setIsMobile(isMobileDevice);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
