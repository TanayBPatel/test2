import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Post, User } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface PostCardProps {
  post: Post;
  author: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex items-center space-x-3 mb-4">
          <Avatar src={author.avatar} alt={author.name} size="md" />
          <div>
            <p className="font-medium text-gray-900">{author.name}</p>
            <p className="text-xs text-gray-500">
              {format(post.createdAt, 'MMM d, yyyy')} at {format(post.createdAt, 'h:mm a')}
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        {showComments && post.comments.length > 0 && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Comments</h4>
            {post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
                    alt="Commenter" 
                    size="sm" 
                  />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm text-gray-900">User Name</p>
                    <p className="text-xs text-gray-500">
                      {format(comment.createdAt, 'MMM d')}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <ThumbsUp size={18} className="mr-1" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button 
            className="flex items-center text-gray-500 hover:text-indigo-600"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare size={18} className="mr-1" />
            <span className="text-sm">{post.comments.length}</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <Share2 size={18} className="mr-1" />
            <span className="text-sm">Share</span>
          </button>
        </div>
        <Button variant="outline" size="sm">
          Add Comment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;