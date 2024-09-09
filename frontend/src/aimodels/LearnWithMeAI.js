import React, { useEffect } from 'react';

const LearnWithMeAI = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '66ddc0e310d1d587421493be' },  // Second project ID
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });

      // Adjust position of the second chatbot after it's loaded
      const chatbotElement = document.querySelector('.vf-chat-widget-launcher');
      if (chatbotElement) {
        chatbotElement.style.position = 'absolute';
        chatbotElement.style.left = '50%';
        chatbotElement.style.top = '50%';
        chatbotElement.style.transform = 'translate(-50%, -50%)';
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6">Learn with me AI</h1>
      <div id="voiceflow-widget" className="voiceflow-widget w-full max-w-sm sm:max-w-md p-10 bg-white rounded-lg shadow-md">
        &rarr; Click on the bottom mentioned button to chat with our Learn with me AI
      </div>
    </div>
  );
};

export default LearnWithMeAI;