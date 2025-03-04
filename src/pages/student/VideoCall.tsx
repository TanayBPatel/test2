import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Share, Settings } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { currentUser, mockMentors } from '../../data/mockData';

const VideoCall: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  
  // For demo purposes, we'll use the first mentor
  const activeMentor = mockMentors[0];
  
  return (
    <div className="space-y-6 h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Video Session</h1>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 bg-green-400 rounded-full"></span>
            Live
          </span>
          <span className="text-sm text-gray-500">00:32:15</span>
        </div>
      </div>
      
      <div className="flex h-[calc(100%-80px)]">
        <div className={`flex-1 flex flex-col ${isChatOpen || isParticipantsOpen ? 'mr-4' : ''}`}>
          <div className="relative bg-black rounded-lg overflow-hidden flex-1 mb-4">
            {/* Main video (mentor) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={activeMentor.avatar} 
                alt={activeMentor.name}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="text-center text-white">
                <Avatar src={activeMentor.avatar} alt={activeMentor.name} size="xl" />
                <p className="mt-2 font-medium">{activeMentor.name}</p>
                <p className="text-sm text-gray-300">Mentor</p>
              </div>
            </div>
            
            {/* Self video (small) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
                </div>
              ) : (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-0.5 rounded">
                You
              </div>
              {isMuted && (
                <div className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
                  <MicOff size={12} className="text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center space-x-4">
            <Button
              variant={isMuted ? "danger" : "secondary"}
              onClick={() => setIsMuted(!isMuted)}
              icon={isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            >
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            
            <Button
              variant={isVideoOff ? "danger" : "secondary"}
              onClick={() => setIsVideoOff(!isVideoOff)}
              icon={isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            >
              {isVideoOff ? "Start Video" : "Stop Video"}
            </Button>
            
            <Button
              variant={isScreenSharing ? "danger" : "secondary"}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              icon={<Share size={20} />}
            >
              {isScreenSharing ? "Stop Sharing" : "Share Screen"}
            </Button>
            
            <Button
              variant={isChatOpen ? "primary" : "secondary"}
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                if (isParticipantsOpen) setIsParticipantsOpen(false);
              }}
              icon={<MessageSquare size={20} />}
            >
              Chat
            </Button>
            
            <Button
              variant={isParticipantsOpen ? "primary" : "secondary"}
              onClick={() => {
                setIsParticipantsOpen(!isParticipantsOpen);
                if (isChatOpen) setIsChatOpen(false);
              }}
              icon={<Users size={20} />}
            >
              Participants
            </Button>
            
            <Button
              variant="secondary"
              icon={<Settings size={20} />}
            >
              Settings
            </Button>
            
            <Button
              variant="danger"
              icon={<Phone size={20} />}
            >
              End Call
            </Button>
          </div>
        </div>
        
        {isChatOpen && (
          <Card className="w-80">
            <CardBody className="p-0 flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex space-x-2">
                  <Avatar src={activeMentor.avatar} alt={activeMentor.name} size="sm" />
                  <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm text-gray-900">How's your progress on the React project?</p>
                    <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 justify-end">
                  <div className="bg-indigo-100 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm text-gray-900">I've completed the component structure, but I'm having issues with state management.</p>
                    <p className="text-xs text-gray-500 mt-1">10:34 AM</p>
                  </div>
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                </div>
                
                <div className="flex space-x-2">
                  <Avatar src={activeMentor.avatar} alt={activeMentor.name} size="sm" />
                  <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm text-gray-900">Let's share your screen and take a look at the code together.</p>
                    <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Button variant="primary" size="sm" icon={<Send size={16} />} />
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        
        {isParticipantsOpen && (
          <Card className="w-80">
            <CardBody className="p-0">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">Participants (2)</h3>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar src={activeMentor.avatar} alt={activeMentor.name} size="sm" status="online" />
                    <div>
                      <p className="font-medium text-gray-900">{activeMentor.name}</p>
                      <p className="text-xs text-gray-500">Mentor (Host)</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Mic size={16} className="text-gray-500" />
                    <Video size={16} className="text-gray-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" status="online" />
                    <div>
                      <p className="font-medium text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">Student (You)</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {isMuted ? (
                      <MicOff size={16} className="text-red-500" />
                    ) : (
                      <Mic size={16} className="text-gray-500" />
                    )}
                    {isVideoOff ? (
                      <VideoOff size={16} className="text-red-500" />
                    ) : (
                      <Video size={16} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper component for the VideoCall page
const Send: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default VideoCall;