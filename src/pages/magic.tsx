import React, { useState, useRef, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Magic = () => {
  const [userDescription, setUserDescription] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchText, setMatchText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const matchTextRef = useRef<HTMLDivElement | null>(null); // Reference for auto-scrolling

  const genAI = new GoogleGenerativeAI('AIzaSyAhD4O120ev0ecXVqwYPB4xciq1i6qrdpI');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'description') {
      setUserDescription(value);
    } else if (name === 'goal') {
      setUserGoal(value);
    }
  };

  // Simulated streaming effect
  const simulateStreaming = (text: string) => {
    setIsStreaming(true);
    let index = -1;
    const words = text.split(' ');

    const stream = setInterval(() => {
      if (index < words.length - 1) {
        setMatchText((prev) => prev + ' ' + words[index]);
        index++;
      } else {
        clearInterval(stream);
        setIsStreaming(false);
      }
    }, 50);
  };

  const handleMatchButtonClick = async () => {
    setLoading(true);
    setMatchText('');

    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const posts = querySnapshot.docs.map((doc) => doc.data());

      const prompt = `
        Be kind and welcoming and accepting in your response, act excited but keep it brief.
        This is a description of myself: "${userDescription}"
        I am looking for: "${userGoal}"
        Here are the details of some other posts:
        ${posts.map((post) => `${post.author}: ${post.body}`).join('\n')}
        Match me with the people I am most compatible with. Provide a brief summary of each match and explain why they are a good fit. Keep it brief. Don't use markdown in your response. Make sure user has all necessary context.
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      console.log(aiResponse);
      simulateStreaming(aiResponse);
    } catch (error) {
      console.error('Error while processing match:', error);
      setMatchText('Failed to get matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom when matchText updates
  useEffect(() => {
    if (matchTextRef.current) {
      matchTextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [matchText]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Breadcrumb pageName="Magic Match!" />

      {/* Introduction Text */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-md">
        <p className="text-lg text-gray-800">
          Having trouble pairing up? Let PeerUP help you find the perfect match based on your personal description and goals.
          Share a bit about yourself and what you're looking for, and PeerUP will match you with your next study group!
        </p>
      </div>

      <div className="space-y-6">
        {/* Form Layout with Two Fields Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">About You</label>
            <textarea
              name="description"
              value={userDescription}
              onChange={handleUserInputChange}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px] resize-none bg-white"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Your Goals</label>
            <textarea
              name="goal"
              value={userGoal}
              onChange={handleUserInputChange}
              placeholder="What are you looking for?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px] resize-none bg-white"
              rows={4}
            />
          </div>
        </div>

        {/* Match Button */}
        <button
          onClick={handleMatchButtonClick}
          disabled={loading || isStreaming}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Finding Your Best Matches...
            </span>
          ) : (
            'Match Me!'
          )}
        </button>
      </div>

      {/* Match Results */}
      {matchText && (
        <div
          className="bg-white text-gray-900 rounded-lg shadow-lg p-6 space-y-4"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))',
          }}
        >
          <h3 className="text-xl font-semibold">Best Matches for You:</h3>
          <div
            ref={matchTextRef}
            className={`prose max-w-none ${isStreaming ? 'animate-pulse' : ''}`}
            style={{
              color: '#333',
              fontWeight: 'normal', // Ensure that the text isn't bold
              lineHeight: '1.6', // Better readability with increased line height
            }}
          >
            {matchText}
          </div>
        </div>
      )}
    </div>
  );
};

export default Magic;
