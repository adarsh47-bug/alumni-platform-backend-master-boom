import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const CareerAssistanceAI = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '66ddd761db493ce960857487' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });

      // Use MutationObserver to apply styles when the chatbot element is inserted
      const observer = new MutationObserver(() => {
        const chatbotElement = document.querySelector('.vf-chat-widget-launcher'); // Make sure this is the right class
        if (chatbotElement) {
          chatbotElement.style.position = 'absolute';
          chatbotElement.style.left = '50%';
          chatbotElement.style.top = '50%';
          chatbotElement.style.transform = 'translate(-50%, -50%)';

          // Once the element is found and styled, disconnect the observer
          observer.disconnect();
        }
      });

      // Observe the body for changes
      observer.observe(document.body, { childList: true, subtree: true });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script and observer when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6">Career Assistance AI</h1>
      <div id="voiceflow-widget" className="voiceflow-widget w-full max-w-sm sm:max-w-md p-10 bg-white rounded-lg shadow-md">
        &rarr; Click on the bottom mentioned button to chat with our Career Assistance AI
      </div>
    </div>
  );
};

export default CareerAssistanceAI;
