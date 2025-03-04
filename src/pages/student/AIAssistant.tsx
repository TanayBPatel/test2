import React, { useState } from 'react';
import { Send, Bot, Lightbulb, BookOpen, Target, Calendar } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { currentUser } from '../../data/mockData';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: `Hi ${currentUser.name}! I'm your AI learning assistant. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };
  
  const getAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('goal') || input.includes('progress')) {
      return "Based on your current goals, you're making good progress on React fundamentals. I suggest focusing on state management concepts next. Would you like me to recommend some resources?";
    } else if (input.includes('recommend') || input.includes('suggestion')) {
      return "I recommend checking out the Advanced React Patterns course by your mentor. Also, based on your learning style, you might benefit from the interactive exercises in the React documentation.";
    } else if (input.includes('stuck') || input.includes('help')) {
      return "I see you're working on a React component project. The error you're encountering is likely related to how you're managing state. Try using the useReducer hook instead of multiple useState calls. Would you like me to show you an example?";
    } else if (input.includes('schedule') || input.includes('meeting')) {
      return "I've analyzed your schedule and your mentor's availability. The best times for your next session would be Wednesday at 3pm or Friday at 10am. Would you like me to suggest this to your mentor?";
    } else {
      return "I'm here to help with your learning journey. You can ask me about your progress, get recommendations, or get help with specific concepts you're struggling with.";
    }
  };
  
  const suggestionPrompts = [
    "How am I progressing on my current goals?",
    "Can you recommend resources for React state management?",
    "I'm stuck on my React component project",
    "Help me schedule my next mentor session"
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Learning Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Bot size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Learning Assistant</h2>
                  <p className="text-xs text-gray-500">Powered by AI</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot size={16} />
                        <span className="font-medium">Learning Assistant</span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </CardBody>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your learning assistant..."
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Button 
                  variant="primary" 
                  onClick={handleSendMessage}
                  icon={<Send size={18} />}
                >
                  Send
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestionPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lightbulb size={18} className="text-yellow-500" />
                <h3 className="font-medium text-gray-900">Learning Insights</h3>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                  <span>You learn best through interactive exercises</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Most productive study time: 9-11am</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-2"></span>
                  <span>You've been consistent with React studies</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen size={18} className="text-blue-500" />
                <h3 className="font-medium text-gray-900">Recommended Resources</h3>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <a href="#" className="text-blue-600 hover:underline">Advanced React Patterns</a>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <a href="#" className="text-blue-600 hover:underline">State Management Deep Dive</a>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <a href="#" className="text-blue-600 hover:underline">Technical Writing Workshop</a>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target size={18} className="text-green-500" />
                <h3 className="font-medium text-gray-900">Goal Suggestions</h3>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Build a React app with Redux</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Complete Python data structures course</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Write a technical blog post</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-purple-500" />
                <h3 className="font-medium text-gray-900">Suggested Schedule</h3>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                  <span>React practice: Mon/Wed 9-11am</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Python: Tue/Thu 2-4pm</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Writing: Fri 10am-12pm</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;