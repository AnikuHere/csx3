import React from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';

interface HelpPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/dhpGeeeQ23', '_blank');
  };

  const handleX3Documentation = () => {
    window.open('https://x3documentation.neocities.org', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Help & Documentation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-[#cccccc] mb-6">
          Get help and access documentation for CSX3 and the X3 programming language.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleJoinDiscord}
            className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <span>Join Discord Community</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleX3Documentation}
            className="w-full flex items-center justify-between px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            <span>X3 Language Documentation</span>
            <FileText className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#cccccc] hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};