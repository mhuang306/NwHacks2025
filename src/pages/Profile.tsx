import { Edit, Gift, CheckCircle, MessageCircle } from 'lucide-react'; // Import CheckCircle for feedback icon
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { db } from '../Firebase'; // Make sure to import Firebase config
import { doc, increment, updateDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [hasCommended, setHasCommended] = useState(false); // State to track commendation status
  const [kudos, setKudos] = useState(0);
  // Function to add 10 points to the user's profile
  const addPoints = async () => {
    try {
      const userRef = doc(db, "users", "fJylkhkdZsamtLbmI6fBIctXM7q1"); // Replace with the correct user ID
      await updateDoc(userRef, {
        rating: increment(10),
      });

      await addDoc(collection(db, 'notifications'), {
        recipient: "Michael Huang",
        posttitle: "Congrats! Daniel just boosted you with +10 kudos!",
        author: "danielzhang.936@gmail.com", // Using displayName or email if name is not available
        createdAt: new Date() // Optional: add timestamp
      });

      setHasCommended(true); // Set commended state to true
    } catch (error) {
      console.error("Error updating points: ", error);
      alert("Failed to add points. Please try again.");
    }
  };

  // Fetch the commendation status from Firestore when the component loads
  useEffect(() => {
    const checkCommendedStatus = async () => {
      try {
        const userRef = doc(db, "users", "fJylkhkdZsamtLbmI6fBIctXM7q1"); // Replace with actual user ID
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setKudos(userData.rating);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    
    checkCommendedStatus();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Banner with gradient overlay */}
        <div className="relative h-48 md:h-64">
          <img
            src="https://t3.ftcdn.net/jpg/03/64/48/60/240_F_364486009_Q6YhLhgdiJ8WkysHp1f3RaxJZlOmTSsj.jpg"
            alt="profile cover"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        {/* Profile Header */}
        <div className="relative -mt-16 px-6 pb-4">
          <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-6">
            <img
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmygHui4gqSYjD3NzH5k3JoJ56Xee861VS5w&s"
              alt="Michael Huang"
            />
            <div className="mt-4 text-center md:mt-0 md:text-left">
              <h4 className="text-2xl font-bold text-gray-900">
                Michael Huang
              </h4>
              <p className="mt-1 text-lg font-medium text-emerald-600">
                UBC CS | 3rd Year
              </p>
              {/* Gift icon to add points with feedback */}

              <div className='flex flex-row gap-4'>
              <button
                onClick={addPoints}
                className={`mt-4 flex items-center space-x-2 cursor-pointer ${hasCommended ? 'text-gray-500' : 'text-emerald-600'}`}
                disabled={hasCommended} // Disable the button if already commended
              >
                {hasCommended ? (
                  <CheckCircle size={20} /> // Show CheckCircle if already commended
                ) : (
                  <Gift size={20} />
                )}
                <span>{hasCommended ? 'Boosted' : 'Boost'}</span>
              </button>
              <button
                className={`mt-4 flex items-center space-x-2 cursor-pointer text-emerald-600`}
              >
                <MessageCircle size={20} />
                <span>Message</span>
              </button>
              </div>
              
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 px-6 py-6">
          {/* About Section */}
          <div>
            <h5 className="text-xl font-semibold text-gray-900">
              About Me
            </h5>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">
              Hey there! I'm Michael, a Computer Science student at UBC with a passion for both learning and teaching. I believe the best way to truly understand something is to help others learn it too. When I'm not coding or tutoring, you'll probably find me exploring Vancouver's coffee shops or hiking trails.
            </p>
          </div>

          {/* Achievements Section */}
          <div>
            <h5 className="text-xl font-semibold text-gray-900">
              Learning Impact
            </h5>
            <div className="mt-3 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-emerald-600">{kudos}</span>
                <span className="text-sm text-gray-500">kudos received</span>
              </div>
              <div className="text-sm font-medium text-emerald-600">
                Top 0.2% Helper
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-emerald-50 p-4">
              <p className="italic text-gray-700">
                "Michael has this amazing ability to break down complex concepts into simple, understandable pieces. His enthusiasm for teaching really shows!"
              </p>
            </div>
          </div>

          {/* Recent Sessions */}
          <div>
            <h5 className="text-xl font-semibold text-gray-900">
              Recent Learning Sessions
            </h5>
            <div className="mt-3 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Intro to Algorithms</p>
                  <p className="text-sm text-gray-600">with Chloe Chu</p>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Data Structures</p>
                  <p className="text-sm text-gray-600">with Don Whacks</p>
                </div>
                <span className="text-sm text-gray-500">2 weeks ago</span>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h5 className="text-xl font-semibold text-gray-900">
              Contacts
            </h5>
            <div className="mt-3 space-y-2 text-lg text-gray-600">
              <p className="flex items-center space-x-2">
                <span>Email: michael.huang@ubc.ca</span>
              </p>
              <p className="flex items-center space-x-2">

                <span>Instagram: @michellin.h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
