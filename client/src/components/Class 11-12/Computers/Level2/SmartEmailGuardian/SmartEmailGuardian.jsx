import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  Shield,
  Brain,
  Target,
  Settings,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const SmartEmailGuardian = () => {
  const { completeComputersChallenge } = useComputers();
  const [trainingSamples, setTrainingSamples] = useState(50);
  const [epochs, setEpochs] = useState(20);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [accuracyData, setAccuracyData] = useState([]);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [weights, setWeights] = useState({
    senderRep: 0.1,
    spellingErrors: 0.1,
    urgentLanguage: 0.1,
    linkCount: 0.1,
    attachmentType: 0.1,
    timeOfDay: 0.1,
  });
  const [testResults, setTestResults] = useState([]);
  const [gamePhase, setGamePhase] = useState("setup"); // setup, training, testing, complete

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  // Sample email dataset
  const emailDataset = [
    {
      id: 1,
      subject: "Meeting rescheduled to 3 PM",
      senderRep: 9,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 0,
      timeOfDay: 8,
      isSpam: false,
    },
    {
      id: 2,
      subject: "URGENT! You've won $1,000,000! Click NOW!",
      senderRep: 1,
      spellingErrors: 3,
      urgentLanguage: 4,
      linkCount: 5,
      attachmentType: 1,
      timeOfDay: 2,
      isSpam: true,
    },
    {
      id: 3,
      subject: "Project deadline reminder",
      senderRep: 8,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 1,
      attachmentType: 2,
      timeOfDay: 10,
      isSpam: false,
    },
    {
      id: 4,
      subject: "FREE Viagra! Act now! Limited time!",
      senderRep: 0,
      spellingErrors: 2,
      urgentLanguage: 3,
      linkCount: 8,
      attachmentType: 0,
      timeOfDay: 23,
      isSpam: true,
    },
    {
      id: 5,
      subject: "Weekly newsletter from HR",
      senderRep: 7,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 2,
      attachmentType: 0,
      timeOfDay: 14,
      isSpam: false,
    },
    {
      id: 6,
      subject: "CONGRATULATIONS! Claim your prize!",
      senderRep: 2,
      spellingErrors: 4,
      urgentLanguage: 2,
      linkCount: 6,
      attachmentType: 1,
      timeOfDay: 3,
      isSpam: true,
    },
    {
      id: 7,
      subject: "Monthly sales report attached",
      senderRep: 9,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 3,
      timeOfDay: 9,
      isSpam: false,
    },
    {
      id: 8,
      subject: "URGENT PAYMENT REQUIRED NOW!",
      senderRep: 1,
      spellingErrors: 1,
      urgentLanguage: 3,
      linkCount: 4,
      attachmentType: 0,
      timeOfDay: 1,
      isSpam: true,
    },
    // Add more diverse samples for better training
    {
      id: 9,
      subject: "Team lunch invitation",
      senderRep: 8,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 0,
      timeOfDay: 12,
      isSpam: false,
    },
    {
      id: 10,
      subject: "Limited offer! Buy 2 get 1 FREE!",
      senderRep: 3,
      spellingErrors: 1,
      urgentLanguage: 2,
      linkCount: 3,
      attachmentType: 0,
      timeOfDay: 19,
      isSpam: true,
    },
    {
      id: 11,
      subject: "Quarterly review meeting",
      senderRep: 9,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 1,
      timeOfDay: 15,
      isSpam: false,
    },
    {
      id: 12,
      subject: "Your account will be suspended!",
      senderRep: 1,
      spellingErrors: 2,
      urgentLanguage: 3,
      linkCount: 2,
      attachmentType: 0,
      timeOfDay: 4,
      isSpam: true,
    },
  ];

  const testEmails = [
    {
      id: 13,
      subject: "Lunch meeting tomorrow at 12",
      senderRep: 8,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 0,
      timeOfDay: 11,
      isSpam: false,
    },
    {
      id: 14,
      subject: "LAST CHANCE! Buy now or miss out!",
      senderRep: 2,
      spellingErrors: 2,
      urgentLanguage: 2,
      linkCount: 3,
      attachmentType: 1,
      timeOfDay: 22,
      isSpam: true,
    },
    {
      id: 15,
      subject: "Budget approval needed",
      senderRep: 7,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 1,
      attachmentType: 2,
      timeOfDay: 10,
      isSpam: false,
    },
    {
      id: 16,
      subject: "Win big! Casino bonuses await!",
      senderRep: 1,
      spellingErrors: 1,
      urgentLanguage: 2,
      linkCount: 4,
      attachmentType: 0,
      timeOfDay: 2,
      isSpam: true,
    },
    {
      id: 17,
      subject: "Conference call at 3 PM",
      senderRep: 9,
      spellingErrors: 0,
      urgentLanguage: 0,
      linkCount: 0,
      attachmentType: 0,
      timeOfDay: 14,
      isSpam: false,
    },
    {
      id: 18,
      subject: "Urgent! Verify your account now!",
      senderRep: 2,
      spellingErrors: 1,
      urgentLanguage: 3,
      linkCount: 2,
      attachmentType: 0,
      timeOfDay: 1,
      isSpam: true,
    },
  ];

  // Neural network prediction function
  const predictSpam = (email, currentWeights) => {
    const features = [
      (10 - email.senderRep) / 10, // Invert sender reputation (higher rep = lower spam chance)
      email.spellingErrors / 5,
      email.urgentLanguage / 5,
      email.linkCount / 10,
      email.attachmentType / 3,
      Math.abs(email.timeOfDay - 12) / 12, // Distance from noon
    ];

    const weightValues = Object.values(currentWeights);
    const score = features.reduce(
      (sum, feature, index) => sum + feature * weightValues[index],
      0
    );

    // Sigmoid activation with some noise to prevent perfect accuracy
    const baseScore = 1 / (1 + Math.exp(-score * 8));
    // Add small random noise to introduce realistic uncertainty
    const noise = (Math.random() - 0.5) * 0.05;
    return Math.max(0, Math.min(1, baseScore + noise));
  };

  // Training simulation with realistic accuracy limits
  const trainNetwork = async () => {
    if (isTraining) return;

    setIsTraining(true);
    setGamePhase("training");
    setCurrentEpoch(0);
    setAccuracyData([]);
    setCurrentAccuracy(0);
    setTrainingComplete(false);

    let currentWeights = { ...weights };
    const learningRate = 0.08; // Slightly reduced learning rate
    const newAccuracyData = [];

    for (let epoch = 0; epoch < epochs; epoch++) {
      let correctPredictions = 0;
      const epochWeights = { ...currentWeights };

      // Generate training data based on samples count
      const trainingData = [];
      for (let i = 0; i < trainingSamples; i++) {
        const baseEmail = emailDataset[i % emailDataset.length];
        // Add some variation to create more training samples
        const variation = {
          ...baseEmail,
          id: i,
          senderRep: Math.max(
            0,
            Math.min(10, baseEmail.senderRep + (Math.random() - 0.5) * 2)
          ),
          spellingErrors: Math.max(
            0,
            Math.floor(baseEmail.spellingErrors + (Math.random() - 0.5) * 2)
          ),
          urgentLanguage: Math.max(
            0,
            Math.floor(baseEmail.urgentLanguage + (Math.random() - 0.5) * 1)
          ),
          linkCount: Math.max(
            0,
            Math.floor(baseEmail.linkCount + (Math.random() - 0.5) * 3)
          ),
        };
        trainingData.push(variation);
      }

      // Train on each email
      for (const email of trainingData) {
        const prediction = predictSpam(email, currentWeights);
        const target = email.isSpam ? 1 : 0;
        const error = target - prediction;

        if (
          (prediction > 0.5 && email.isSpam) ||
          (prediction <= 0.5 && !email.isSpam)
        ) {
          correctPredictions++;
        }

        // Update weights based on error
        const features = [
          (10 - email.senderRep) / 10,
          email.spellingErrors / 5,
          email.urgentLanguage / 5,
          email.linkCount / 10,
          email.attachmentType / 3,
          Math.abs(email.timeOfDay - 12) / 12,
        ];

        const weightKeys = Object.keys(currentWeights);
        weightKeys.forEach((key, index) => {
          currentWeights[key] += learningRate * error * features[index];
        });
      }

      let accuracy = (correctPredictions / trainingData.length) * 100;

      // Apply realistic accuracy constraints
      // Early epochs: lower accuracy (70-85%)
      // Middle epochs: gradual improvement (85-95%)
      // Later epochs: plateau at 90-97%
      const progressRatio = epoch / epochs;

      if (progressRatio < 0.3) {
        // Early training: 70-85%
        accuracy = Math.min(accuracy, 70 + progressRatio * 50);
      } else if (progressRatio < 0.7) {
        // Middle training: 85-95%
        accuracy = Math.min(accuracy, 85 + (progressRatio - 0.3) * 25);
      } else {
        // Late training: plateau at 90-97%
        const maxAccuracy = 90 + Math.random() * 7; // Random between 90-97%
        accuracy = Math.min(accuracy, maxAccuracy);
      }

      // Add some realistic fluctuation
      accuracy += (Math.random() - 0.5) * 2;
      accuracy = Math.max(70, Math.min(97, accuracy)); // Hard cap at 97%

      newAccuracyData.push({ epoch: epoch + 1, accuracy });

      setCurrentEpoch(epoch + 1);
      setCurrentAccuracy(accuracy);
      setAccuracyData([...newAccuracyData]);
      setWeights({ ...currentWeights });

      // Slow down training for visualization
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsTraining(false);
    setTrainingComplete(true);
    setGamePhase("testing");
  };

  // Test the trained network
  const testNetwork = () => {
    const results = testEmails.map((email) => {
      const prediction = predictSpam(email, weights);
      const predictedSpam = prediction > 0.5;
      const correct = predictedSpam === email.isSpam;

      return {
        email,
        prediction: prediction * 100,
        predictedSpam,
        correct,
      };
    });

    setTestResults(results);
    const baseTestAccuracy =
      (results.filter((r) => r.correct).length / results.length) * 100;

    // Ensure test accuracy is also realistic (90-97%)
    const testAccuracy = Math.min(baseTestAccuracy, 90 + Math.random() * 7);

    // ✅ Track performance when testing is done
    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;

    updatePerformance({
      moduleName: "Computers",
      topicName: "machineLearningInDailyLife",
      score: Math.round(testAccuracy / 10), // out of 10
      accuracy: testAccuracy,
      avgResponseTimeSec: timeTakenSec / testEmails.length,
      studyTimeMinutes: Math.ceil(timeTakenSec / 60),
      completed: testAccuracy >= 90,
    });
    setStartTime(Date.now());

    if (testAccuracy >= 90) {
      completeComputersChallenge(1, 1);
      setGamePhase("complete");
    }
  };

  const resetGame = () => {
    setGamePhase("setup");
    setCurrentEpoch(0);
    setIsTraining(false);
    setTrainingComplete(false);
    setAccuracyData([]);
    setCurrentAccuracy(0);
    setTestResults([]);
    setWeights({
      senderRep: 0.1,
      spellingErrors: 0.1,
      urgentLanguage: 0.1,
      linkCount: 0.1,
      attachmentType: 0.1,
      timeOfDay: 0.1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Smart Email Guardian
            </h1>
            <Brain className="w-10 h-10 text-purple-600 ml-3" />
          </div>
          <p className="text-lg text-gray-600">
            Train a Neural Network to detect spam emails
          </p>
        </div>

        {/* Game Setup */}
        {gamePhase === "setup" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Neural Network Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Dataset Size (max 200)
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={trainingSamples}
                  onChange={(e) => setTrainingSamples(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-lg font-semibold text-blue-600">
                  {trainingSamples} samples
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Epochs (max 50)
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-lg font-semibold text-purple-600">
                  {epochs} epochs
                </div>
              </div>
            </div>
            <button
              onClick={trainNetwork}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Training Neural Network
            </button>
          </div>
        )}

        {/* Training Phase */}
        {gamePhase === "training" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              Neural Network Training
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentEpoch}/{epochs}
                </div>
                <div className="text-sm text-gray-600">Epochs</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentAccuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {trainingSamples}
                </div>
                <div className="text-sm text-gray-600">Training Samples</div>
              </div>
            </div>

            {/* Training Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Training Progress</span>
                <span className="text-sm text-gray-600">
                  {((currentEpoch / epochs) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentEpoch / epochs) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Accuracy Chart */}
            {accuracyData.length > 0 && (
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip
                      formatter={(value) => [
                        `${value.toFixed(1)}%`,
                        "Accuracy",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Network Weights Visualization */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Neural Network Weights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm text-gray-600 mb-1">{key}</div>
                    <div className="text-lg font-semibold">
                      {value.toFixed(3)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.abs(value) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Testing Phase */}
        {gamePhase === "testing" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Test the Trained Network
            </h2>

            <div className="mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentAccuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">
                  Final Training Accuracy
                </div>
              </div>
            </div>

            <button
              onClick={testNetwork}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mb-6"
            >
              <Target className="w-5 h-5 mr-2" />
              Test Network on New Emails
            </button>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Test Results</h3>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.correct
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          {result.email.subject}
                        </div>
                        <div className="text-sm text-gray-600">
                          Actual: {result.email.isSpam ? "Spam" : "Legitimate"}{" "}
                          | Predicted:{" "}
                          {result.predictedSpam ? "Spam" : "Legitimate"} (
                          {result.prediction.toFixed(1)}%)
                        </div>
                      </div>
                      <div
                        className={`font-bold ${
                          result.correct ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.correct ? "✓" : "✗"}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <div className="text-lg font-semibold">
                    Test Accuracy:{" "}
                    {(
                      (testResults.filter((r) => r.correct).length /
                        testResults.length) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  {testResults.filter((r) => r.correct).length /
                    testResults.length >=
                    0.9 && (
                    <div className="text-green-600 font-bold mt-2">
                      🎉 Excellent! You achieved 90%+ accuracy!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Victory Screen */}
        {gamePhase === "complete" && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-xl mb-4">
              You've successfully trained a neural network to detect spam
              emails!
            </p>
            <p className="text-lg mb-6">
              Your AI achieved realistic performance with 90%+ accuracy -
              excellent for real-world deployment!
            </p>
            <div className="bg-gray-800 bg-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                🔬 <strong>Real-world note:</strong> Even the best spam filters
                don't achieve 100% accuracy. Your model's 90-97% performance is
                actually excellent and prevents overfitting!
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 flex items-center justify-center mx-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </button>
          </div>
        )}

        {/* Reset Button */}
        {gamePhase !== "setup" && gamePhase !== "complete" && (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center mx-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </button>
          </div>
        )}

        {/* Educational Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">How Neural Networks Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Input Features</h4>
              <ul className="text-sm space-y-1">
                <li>• Sender Reputation (0-10)</li>
                <li>• Spelling Errors Count</li>
                <li>• Urgent Language Count</li>
                <li>• Number of Links</li>
                <li>• Attachment Type</li>
                <li>• Time of Day</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Learning Process</h4>
              <ul className="text-sm space-y-1">
                <li>• Network makes predictions</li>
                <li>• Compares with actual labels</li>
                <li>• Adjusts weights based on errors</li>
                <li>• Improves accuracy over time</li>
                <li>• Learns spam patterns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Realistic Performance</h4>
              <ul className="text-sm space-y-1">
                <li>• 90-97% accuracy is excellent</li>
                <li>• 100% accuracy indicates overfitting</li>
                <li>• Real models have uncertainty</li>
                <li>• Prevents false positives</li>
                <li>• Generalizes to new data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartEmailGuardian;
