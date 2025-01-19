import React, { useState, useRef } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2, Brain, Target } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const Magic = () => {
  const [userDescription, setUserDescription] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchText, setMatchText] = useState('');
  const [skillsData, setSkillsData] = useState([
    { subject: 'Technical', You: 0, Match: 0 },
    { subject: 'Communication', You: 0, Match: 0 },
    { subject: 'Problem Solving', You: 0, Match: 0 },
    { subject: 'Creativity', You: 0, Match: 0 },
    { subject: 'Leadership', You: 0, Match: 0 },
    { subject: 'Collaboration', You: 0, Match: 0 }
  ]);
  const resultRef = useRef(null);

  const genAI = new GoogleGenerativeAI('AIzaSyAhD4O120ev0ecXVqwYPB4xciq1i6qrdpI');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const processSkillAnalysis = async (description) => {
    try {
      const prompt = `
        Given this description: "${description}"
        Rate these skills from 0-100:
        - Technical ability
        - Communication
        - Problem solving
        - Creativity
        - Leadership
        - Collaboration
        
        Return only numbers in this exact format:
        technical,communication,problem,creativity,leadership,collaboration
      `;

      const result = await model.generateContent(prompt);
      const ratings = result.response.text().trim().split(',').map(Number);
      
      const newData = [
        { subject: 'Technical', You: ratings[0], Match: Math.min(100, ratings[0] + Math.random()*20-5) },
        { subject: 'Communication', You: ratings[1], Match: Math.min(100, ratings[1] + Math.random()*20-5) },
        { subject: 'Problem Solving', You: ratings[2], Match: Math.min(100, ratings[2] + Math.random()*20-5) },
        { subject: 'Creativity', You: ratings[3], Match: Math.min(100, ratings[3] + Math.random()*20-5) },
        { subject: 'Leadership', You: ratings[4], Match: Math.min(100, ratings[4] + Math.random()*20-5) },
        { subject: 'Collaboration', You: ratings[5], Match: Math.min(100, ratings[5] + Math.random()*20-5) }
      ];
      
      setSkillsData(newData);
    } catch (error) {
      console.error('Error analyzing skills:', error);
    }
  };

  const handleMatchButtonClick = async () => {
    setLoading(true);
    setMatchText('');

    try {
      await processSkillAnalysis(userDescription);
      
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const posts = querySnapshot.docs.map((doc) => doc.data());

      const prompt = `
        Find the best single match for someone with these skills: "${userDescription}"
        who wants to learn: "${userGoal}"
        from these peers: ${posts.map((post) => `${post.author}: ${post.body}`).join('\n')}
        Return an excited, welcoming 2-3 sentence response about the best match.
      `;

      const result = await model.generateContent(prompt);
      setMatchText(result.response.text());
      
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error:', error);
      setMatchText('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Breadcrumb pageName="Magic Match" />

      {/* Introduction Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-100 p-6 rounded-xl mb-6">
        <p className="text-emerald-700">
          PeerUP helps you analyze your skills and connect with peers who share your learning goals.
          Get personalized skill ratings and discover your perfect match based on your strengths and ambitions.
        </p>
      </div>

      {/* Input Fields Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-emerald-600" />
            <label className="font-medium text-gray-700">Your Expertise</label>
          </div>
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder="Describe your skills..."
            className="w-full p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] resize-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-emerald-600" />
            <label className="font-medium text-gray-700">Learning Goals</label>
          </div>
          <textarea
            value={userGoal}
            onChange={(e) => setUserGoal(e.target.value)}
            placeholder="What do you want to learn?"
            className="w-full p-3 rounded-lg border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] resize-none"
          />
        </div>
      </div>

      {/* Match Button */}
      <div className="flex justify-center">
        <button
          onClick={handleMatchButtonClick}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6 w-full sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </span>
          ) : (
            "Match Me!"
          )}
        </button>
      </div>

      {/* Results Section */}
      {(skillsData[0].You > 0 || matchText) && (
        <div ref={resultRef} className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-full w-full">
            <h3 className="font-medium text-gray-800 mb-2">Skills Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Your Skills"
                  dataKey="You"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Ideal Match"
                  dataKey="Match"
                  stroke="#0284c7"
                  fill="#0284c7"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {matchText && (
            <div className="prose max-w-none flex flex-col justify-center">
              <h3 className="font-medium text-gray-800 mb-2">Best Match</h3>
              <div className="text-gray-700">{matchText}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Magic;
