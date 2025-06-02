// PlayIQ Edition: Math Module - Mobile-Ready, Responsive, Soccer-Themed
import React, { useState, useEffect, createContext, useContext } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [tokens, setTokens] = useState(0);
  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

const generateProblem = () => {
  const type = Math.random() > 0.5 ? "addition" : "subtraction";
  const a = Math.floor(Math.random() * 6) + 5;
  const b = Math.floor(Math.random() * (a - 1)) + 1;
  return { type, a, b };
};

export default function PlayIQMath() {
  const [problem, setProblem] = useState(generateProblem());
  const [step, setStep] = useState(0);
  const [count, setCount] = useState([]);
  const [animateGoal, setAnimateGoal] = useState(false);
  const { tokens, setTokens } = useContext(TokenContext);

  const handleNext = () => {
    setAnimateGoal(true);
    setTimeout(() => {
      setTokens(tokens + 1);
      setProblem(generateProblem());
      setStep(0);
      setCount([]);
      setAnimateGoal(false);
    }, 1500);
  };

  const renderBalls = (num, color, interactive = false, onClick = () => {}) => {
    return (
      <div className="flex gap-2 flex-wrap justify-center">
        {[...Array(num)].map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-4 border-black bg-${color}-500 cursor-pointer`}
            onClick={() => interactive && onClick(i)}
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    const { a, b, type } = problem;
    if (type === "addition") {
      if (step === 0) {
        return (
          <div>
            <p className="text-xl sm:text-lg">Here are {a} red soccer balls:</p>
            {renderBalls(a, "red")}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setStep(1)}>Next</button>
          </div>
        );
      } else if (step === 1) {
        return (
          <div>
            <p className="text-xl sm:text-lg">Now add {b} blue soccer balls:</p>
            {renderBalls(b, "blue")}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setStep(2)}>Next</button>
          </div>
        );
      } else {
        return (
          <div>
            <p className="text-xl sm:text-lg">How many soccer balls in total?</p>
            {renderBalls(a, "red")}
            {renderBalls(b, "blue")}
            <p className="text-lg font-bold">{a + b}</p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded" onClick={handleNext}>Kick into Goal!</button>
          </div>
        );
      }
    } else {
      if (step === 0) {
        return (
          <div>
            <p className="text-xl sm:text-lg">We start with {a} soccer balls.</p>
            {renderBalls(a, "black", true, (i) => {
              const updated = [...count];
              updated[i] = true;
              setCount(updated);
            })}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setStep(1)}>Remove {b}</button>
          </div>
        );
      } else {
        const remaining = a - b;
        return (
          <div>
            <p className="text-xl sm:text-lg">Now count what's left:</p>
            {renderBalls(remaining, "black")}
            <p className="text-lg font-bold">{remaining}</p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded" onClick={handleNext}>Kick into Goal!</button>
          </div>
        );
      }
    }
  };

  return (
    <div
      className="p-4 sm:p-2 w-full min-h-screen flex flex-col items-center justify-center text-center bg-green-200 relative"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599058917212-d750089bc635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)', backgroundSize: 'cover' }}
    >
      <h1 className="text-3xl sm:text-2xl font-bold mb-4 text-white drop-shadow">⚽ PlayIQ: Math Module</h1>
      {renderContent()}
      <div className="mt-6 text-lg text-white">Tokens Earned: {tokens}</div>
      {animateGoal && (
        <div className="absolute bottom-10 animate-bounce text-white text-2xl sm:text-xl font-bold">
          GOAL!!! 🎉
        </div>
      )}
    </div>
  );
}
