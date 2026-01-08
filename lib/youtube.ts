// Centralized YouTube API loader to prevent race conditions between multiple video components

let youTubeAPIPromise: Promise<void> | null = null;
let isAPIReady = false;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function loadYouTubeAPI(): Promise<void> {
  // Return existing promise if already loading/loaded
  if (youTubeAPIPromise) {
    return youTubeAPIPromise;
  }

  // If API is already ready, return resolved promise
  if (isAPIReady && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  // Create new promise for API loading
  youTubeAPIPromise = new Promise<void>((resolve, reject) => {
    // If API is already available, resolve immediately
    if (window.YT && window.YT.Player) {
      isAPIReady = true;
      resolve();
      return;
    }

    // Set up the global callback - this will only be set once
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      // Call original callback if it existed
      if (originalCallback) {
        originalCallback();
      }
      
      isAPIReady = true;
      resolve();
    };

    // Only inject script if it hasn't been injected yet
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = () => {
        console.log('[YouTube] API script loaded');
      };
      script.onerror = () => {
        console.error('[YouTube] Failed to load API script');
        youTubeAPIPromise = null; // Allow retry
        reject(new Error('Failed to load YouTube API'));
      };
      
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }
  });

  return youTubeAPIPromise;
}

// Helper function to check if API is ready
export function isYouTubeAPIReady(): boolean {
  return isAPIReady && window.YT && window.YT.Player;
}